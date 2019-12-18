//Graphql type 및 resolver들을 한 폴더 하위에 모아 두고 한번에 합치는 부분

import {makeExecutableSchema} from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import path from "path"

                                            //api하위 .graphql확장자 모두 merge
const allType = fileLoader(path.join(__dirname,"/api/**/*.graphql"));
                                            //api하위 .js확장자 모두 merge
const allResolvers = fileLoader(path.join(__dirname,"/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allType),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;