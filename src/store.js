import Vue from 'vue'
import Vuex from 'vuex'
import exampleData from 'simple-mind-map/example/exampleData'
import { storeLocalConfig } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mindMapData: null, // 思维导图数据
    isHandleLocalFile: false, // 是否操作的是本地文件
    localConfig: {
      // 本地配置
      isZenMode: false, // 是否是禅模式
      // 是否开启节点富文本
      // openNodeRichText: true
      // openNodeRichText: false
    },
    activeSidebar: false, // 当前显示的侧边栏
    cases: 0,
    dics: 0
  },
  mutations: {
    /**
     * @Author: 王林
     * @Date: 2021-04-10 14:50:01
     * @Desc: 设置思维导图数据
     */
    setMindMapData(state, data) {
      state.mindMapData = data
    },

    setCases(state, data) {
      state.cases = data
    },
    setDics(state, data) {
      state.dics = data
    },

    /**
     * javascript comment
     * @Author: 王林
     * @Date: 2022-09-24 13:55:38
     * @Desc: 设置操作本地文件标志位
     */
    setIsHandleLocalFile(state, data) {
      state.isHandleLocalFile = data
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2022-11-14 18:42:47
     * @Desc: 设置本地配置
     */
    setLocalConfig(state, data) {
      state.localConfig = {
        ...state.localConfig,
        ...data
      }
      storeLocalConfig(state.localConfig)
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2022-11-15 19:25:26
     * @Desc: 设置当前显示的侧边栏
     */
    setActiveSidebar(state, data) {
      state.activeSidebar = data
    }
  },
  actions: {
    /**
     * @Author: 王林
     * @Date: 2021-04-10 14:50:40
     * @Desc: 设置初始思维导图数据
     */
    getUserMindMapData(ctx) {
      try {
        let { data } = {
          data: {
            data: {
              // mindMapData: exampleData
              mindMapData: {"layout":"logicalStructure","root":{"data":{"text":"项目名称","expand":true,"isActive":false,"borderColor":"#000000","borderWidth":2},"children":[{"data":{"text":"用例目录1","expand":true,"isActive":false,"borderColor":"#000000","borderWidth":2},"children":[{"data":{"text":"用例名称1","expand":true,"isActive":false,"fillColor":"#73D8FF","borderColor":"#000000","borderWidth":1},"children":[{"data":{"text":"前提条件1","expand":true,"isActive":false,"borderDasharray":"5,5","borderWidth":1,"borderColor":"#000000"},"children":[{"data":{"text":"测试步骤1","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果1","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"测试步骤2","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果2","expand":true,"isActive":false},"children":[]}]}]}]}]}]},"theme":{"template":"classic2","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-675,"translateY":-94,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-675,"f":-94},"state":{"scale":1,"x":-675,"y":-94,"sx":0,"sy":0}}}
            }
          }
        }
        ctx.commit('setMindMapData', data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default store
