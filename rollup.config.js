import path from 'path'
import ts from 'rollup-plugin-typescript2'  // 引入ts
import serve from 'rollup-plugin-serve' // 前端服务
import livereload from 'rollup-plugin-livereload' // 热更新
import terser from '@rollup/plugin-terser' // 代码压缩
import replace from '@rollup/plugin-replace' // 动态地替换配置文件中的常量，或者在不同环境中使用不同的变量，比如在浏览器中查看环境变量

// console.log(process.env)
const isDev = () => {
  return process.env.NODE_ENV === 'development'
}
export default {
  input: './src/index.ts',

  output: {
    file: path.resolve(__dirname, './lib/index.js'), // 输出地址
    format: 'umd',
    sourcemap: true  // 方便代码查看(tsconfig.json中的sourcemap同时修改为true)
  },

  plugins: [
    ts(),
    isDev() && livereload(),  // 生成环境不需要热更新
    terser({
      compress: {
        drop_console: true   //打包后清除所有console
      }
    }), // 打包时压缩代码
    replace({
      preventAssignment: true,
      'process.env': JSON.stringify(process.env)  // 需要什么自己定义
    }),
    isDev() && serve({   // 打包时不需要开服务
      openPage:"/public/index.html",  // 打开的目录文件
      open: true, // 是否打开
  
      port: 9527, // 自定义端口
    })

  ]
}