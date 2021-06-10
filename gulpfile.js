import gulp from 'gulp'
import merge from 'merge2'
import rename from 'gulp-rename'
import rimraf from 'rimraf'
import sourcemaps from 'gulp-sourcemaps'
import terser from 'gulp-terser'
import ts from 'gulp-typescript'
import typedoc from 'gulp-typedoc'
import fsa from 'fs/promises'
import rewriteImports from 'gulp-rewrite-imports'
import path from 'path'
import * as TsMorph from 'ts-morph'
const MorphProject = TsMorph.Project;
const StructureKind = TsMorph.StructureKind;
const CodeBlockWriter = TsMorph.CodeBlockWriter;
const VariableDeclarationKind = TsMorph.VariableDeclarationKind;

/** @type {{version:string}} */
const pj = await fsa.readFile("package.json").then(jsonString => JSON.parse(jsonString));
const unpkgRoot = "https://unpkg.com/shieldsio-elements@" + pj.version + "/dist/";
/** @type {{[k:string]: string}} */
const importMappings = {};
for (const srcFile of await fsa.readdir("src/")) {
    const name = path.basename(srcFile, ".ts");
    importMappings["./" + name + ".js"] = unpkgRoot + name + ".min.js";
}

gulp.task("generate", async function () {
    /** @type {{icons:{slug?:string,title:string,source:string,hex:string}[]}} */
    const iconsData = await fsa.readFile("node_modules/simple-icons/_data/simple-icons.json").then(jsonString => JSON.parse(jsonString));
    const generatedProject = new MorphProject();
    const simpleIconsFile = generatedProject.createSourceFile("src/simple-icons.g.ts", null, {
        overwrite: true
    });
    const enumMembers = [];
    const varCodeWriter = new CodeBlockWriter();
    varCodeWriter.block(() => {
        for (const icon of iconsData.icons) {
            const memberName = (icon.slug || icon.title).replace(/[\s_\-\.](\w)/g, /** @param p1 {String} */function (match, p1) {
                return p1.toUpperCase();
            }).replace(/\W/g, "_").replace(/^\w/g, /** @param match {String} */function (match) {
                return match.toUpperCase();
            }).replace(/^[^a-zA-Z_]/g, "_$&");
            const memberValue = (icon.slug || icon.title).replace(/\s/g, "-");
            enumMembers.push({
                name: memberName,
                value: memberValue,
                docs: [
                    {
                        description: icon.title,
                        tags: [
                            {
                                tagName: "see",
                                text: icon.source
                            }
                        ]
                    }
                ]
            });
            varCodeWriter.write("[SimpleIcons.").write(memberName).write("]:").block(() => {
                varCodeWriter.write("hex:").quote(icon.hex).write(",").
                write("title:").quote(icon.title).write(",").
                write("source:").quote(icon.source).write(",");
                if (icon.slug) {
                    varCodeWriter.write("slug:").quote(icon.slug);
                }
            }).write(",");
        }
    });
    const simpleIconsEnum = simpleIconsFile.addEnum({
        name: "SimpleIcons",
        isExported: true,
        kind: StructureKind.Enum,
        docs: [
            {
                description: "Simple Icon Names"
            }
        ],
        members: enumMembers
    });
    const iconsInterface = simpleIconsFile.addInterface({
        name: "SimpleIcon",
        isExported: true,
        properties: [
            {
                name: "title",
                isReadonly: true,
                type: "string"
            },
            {
                name: "source",
                isReadonly: true,
                type: "string"
            },
            {
                name: "slug",
                isReadonly: true,
                type: "string",
                hasQuestionToken: true
            },
            {
                name: "hex",
                isReadonly: true,
                type: "string"
            }
        ]
    });
    simpleIconsFile.addVariableStatement({
        declarations: [
            {
                initializer: varCodeWriter.toString(),
                name: "icons",
                type: "{[k: string]:" + iconsInterface.getName() + "}"
            }
        ],
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        docs: [
            {
                description: "Information about the simple icons."
            }
        ]
    })
    await generatedProject.save();
});

gulp.task("docs", function () {
    return gulp.src("src/index.ts").pipe(typedoc({
        out: "docs",
        excludeExternals: true,
        excludePrivate: true,
        excludeInternal: true,
        entryPoints: ["src/index.ts"]
    }));
});

gulp.task("ts-build", function () {
    pj.version
    const tsProject = ts.createProject("tsconfig.json");
    const result = tsProject.src().
        pipe(sourcemaps.init()).
        pipe(tsProject());
    return merge([
        result.js.
            pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "../src" })).
            pipe(gulp.dest("dist")),
        result.dts.
            pipe(gulp.dest("dist"))
    ]);
});

gulp.task("minify", function () {
    return gulp.src("dist/*.js").
        pipe(sourcemaps.init()).
        pipe(rewriteImports({
            noRequire: true,
            noImport: true,
            experimentalEnableStreams: true,
            mappings: importMappings
        })).
        pipe(terser()).
        pipe(rename({ extname: ".min.js" })).
        pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "." })).
        pipe(gulp.dest("dist"));
});

gulp.task("clean", async function () {
    rimraf("dist/*.*", function ()  {});
});

gulp.task("build", gulp.series(["clean", "ts-build", "minify"]));