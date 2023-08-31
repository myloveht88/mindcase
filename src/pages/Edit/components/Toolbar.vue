<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <!-- 节点操作 -->
      <div class="toolbarBlock">
        <div class="toolbarBtn" :class="{
          disabled: readonly || backEnd
        }" @click="$bus.$emit('execCommand', 'BACK')">
          <span class="icon iconfont iconhoutui-shi"></span>
          <span class="text">{{ $t('toolbar.undo') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: readonly || forwardEnd
        }" @click="$bus.$emit('execCommand', 'FORWARD')">
          <span class="icon iconfont iconqianjin1"></span>
          <span class="text">{{ $t('toolbar.redo') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0 || hasRoot || hasGeneralization
        }" @click="$bus.$emit('execCommand', 'INSERT_NODE')">
          <span class="icon iconfont iconjiedian"></span>
          <span class="text">{{ $t('toolbar.insertSiblingNode') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0 || hasGeneralization
        }" @click="$bus.$emit('execCommand', 'INSERT_CHILD_NODE')">
          <span class="icon iconfont icontianjiazijiedian"></span>
          <span class="text">{{ $t('toolbar.insertChildNode') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('execCommand', 'REMOVE_NODE')">
          <span class="icon iconfont iconshanchu"></span>
          <span class="text">{{ $t('toolbar.deleteNode') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('showNodeImage')">
          <span class="icon iconfont iconimage"></span>
          <span class="text">{{ $t('toolbar.image') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('showNodeIcon')">
          <span class="icon iconfont iconxiaolian"></span>
          <span class="text">{{ $t('toolbar.icon') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('showNodeLink')">
          <span class="icon iconfont iconchaolianjie"></span>
          <span class="text">{{ $t('toolbar.link') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('showNodeNote')">
          <span class="icon iconfont iconflow-Mark"></span>
          <span class="text">{{ $t('toolbar.note') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0
        }" @click="$bus.$emit('showNodeTag')">
          <span class="icon iconfont iconbiaoqian"></span>
          <span class="text">{{ $t('toolbar.tag') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0 || hasRoot || hasGeneralization
        }" @click="$bus.$emit('execCommand', 'ADD_GENERALIZATION')">
          <span class="icon iconfont icongaikuozonglan"></span>
          <span class="text">{{ $t('toolbar.summary') }}</span>
        </div>
        <div class="toolbarBtn" :class="{
          disabled: activeNodes.length <= 0 || hasGeneralization
        }" @click="$bus.$emit('createAssociativeLine')">
          <span class="icon iconfont iconlianjiexian"></span>
          <span class="text">{{ $t('toolbar.associativeLine') }}</span>
        </div>
      </div>
      <!-- 导出 -->
      <div class="toolbarBlock">
        <!-- <div class="toolbarBtn" @click="createNewLocalFile">
          <span class="icon iconfont iconxinjian"></span>
          <span class="text">{{ $t('toolbar.newFile') }}</span>
        </div> -->
        <div class="toolbarBtn" @click="newdialog = true">
          <span class="icon iconfont iconxinjian"></span>
          <span class="text">{{ $t('toolbar.newFile') }}</span>
        </div>
        <!-- <div class="toolbarBtn" @click="openLocalFile">
          <span class="icon iconfont icondakai"></span>
          <span class="text">{{ $t('toolbar.openFile') }}</span>
        </div> -->
        <!-- <div class="toolbarBtn" @click="saveLocalFile">
          <span class="icon iconfont iconlingcunwei"></span>
          <span class="text">{{ $t('toolbar.saveAs') }}</span>
        </div> -->
        <div class="toolbarBtn" @click="$bus.$emit('showImport')">
          <span class="icon iconfont icondaoru"></span>
          <span class="text">{{ $t('toolbar.import') }}</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showExport')">
          <span class="icon iconfont iconexport"></span>
          <span class="text">{{ $t('toolbar.export') }}</span>
        </div>
        <!-- <div class="toolbarBtn" @click="test">
          <span class="icon iconfont iconlingcunwei"></span>
          <span class="text">{{ $t('toolbar.saveAs') }}</span>
        </div> -->
        <div class="toolbarBtn" @click="showJson">
          <span class="icon iconfont iconexcel"></span>
          <span class="text">{{ $t('toolbar.showJson') }}</span>
        </div>
      </div>
    </div>
    <NodeImage></NodeImage>
    <NodeHyperlink></NodeHyperlink>
    <NodeIcon></NodeIcon>
    <NodeNote></NodeNote>
    <NodeTag></NodeTag>
    <Export></Export>
    <Import></Import>
    <el-dialog title="提示" :visible.sync="newdialog" width="30%">
      <span>新建脑图会清空当前数据，是否确认新建？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false">取 消</el-button>
        <el-button type="primary" @click="newJson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NodeImage from './NodeImage'
import NodeHyperlink from './NodeHyperlink'
import NodeIcon from './NodeIcon'
import NodeNote from './NodeNote'
import NodeTag from './NodeTag'
import Export from './Export'
import Import from './Import'
import { mapState } from 'vuex'
import { Notification } from 'element-ui'
import exampleData from 'simple-mind-map/example/exampleData'
import { getData } from '../../../api'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:58
 * @Desc: 工具栏
 */
let fileHandle = null
export default {
  name: 'Toolbar',
  components: {
    NodeImage,
    NodeHyperlink,
    NodeIcon,
    NodeNote,
    NodeTag,
    Export,
    Import
  },
  data() {
    return {
      activeNodes: [],
      backEnd: false,
      forwardEnd: true,
      readonly: false,
      isFullDataFile: false,
      timer: null,
      newdialog: false
    }
  },
  computed: {
    ...mapState(['isHandleLocalFile']),
    hasRoot() {
      return (
        this.activeNodes.findIndex(node => {
          return node.isRoot
        }) !== -1
      )
    },
    hasGeneralization() {
      return (
        this.activeNodes.findIndex(node => {
          return node.isGeneralization
        }) !== -1
      )
    }
  },
  watch: {
    isHandleLocalFile(val) {
      if (!val) {
        Notification.closeAll()
      }
    }
  },
  created() {
    this.$bus.$on('mode_change', this.onModeChange)
    this.$bus.$on('node_active', this.onNodeActive)
    this.$bus.$on('back_forward', this.onBackForward)
    this.$bus.$on('write_local_file', this.onWriteLocalFile)
  },
  beforeDestroy() {
    this.$bus.$off('mode_change', this.onModeChange)
    this.$bus.$off('node_active', this.onNodeActive)
    this.$bus.$off('back_forward', this.onBackForward)
    this.$bus.$off('write_local_file', this.onWriteLocalFile)
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:17:40
     * @Desc: 监听模式切换
     */
    onModeChange(mode) {
      this.readonly = mode === 'readonly'
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:18:06
     * @Desc: 监听节点激活
     */
    onNodeActive(...args) {
      this.activeNodes = args[1]
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:18:31
     * @Desc: 监听前进后退
     */
    onBackForward(index, len) {
      this.backEnd = index <= 0
      this.forwardEnd = index >= len - 1
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:19:14
     * @Desc: 监听本地文件读写
     */
    onWriteLocalFile(content) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.writeLocalFile(content)
      }, 1000)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:09
     * @Desc: 打开本地文件
     */
    async openLocalFile() {
      try {
        let [_fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: '',
              accept: {
                'application/json': ['.smm']
              }
            }
          ],
          excludeAcceptAllOption: true,
          multiple: false
        })
        if (!_fileHandle) {
          return
        }
        fileHandle = _fileHandle
        if (fileHandle.kind === 'directory') {
          this.$message.warning('请选择文件')
          return
        }
        this.readFile()
      } catch (error) {
        console.log(error)
        if (error.toString().includes('aborted')) {
          return
        }
        this.$message.warning(
          '你的浏览器可能不支持，建议使用最新版本的Chrome浏览器'
        )
      }
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:18
     * @Desc: 读取本地文件
     */
    async readFile() {
      let file = await fileHandle.getFile()
      let fileReader = new FileReader()
      fileReader.onload = async () => {
        this.$store.commit('setIsHandleLocalFile', true)
        this.setData(fileReader.result)
        Notification.closeAll()
        Notification({
          title: '提示',
          message: `当前正在编辑你本机的【${file.name}】文件`,
          duration: 0,
          showClose: false
        })
      }
      fileReader.readAsText(file)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:26
     * @Desc: 渲染读取的数据
     */
    setData(str) {
      try {
        let data = JSON.parse(str)
        if (typeof data !== 'object') {
          throw new Error('文件内容有误')
        }
        if (data.root) {
          this.isFullDataFile = true
        } else {
          this.isFullDataFile = false
          data = {
            ...exampleData,
            root: data
          }
        }
        this.$bus.$emit('setData', data)
      } catch (error) {
        console.log(error)
        this.$message.error('文件打开失败')
      }
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:42
     * @Desc: 写入本地文件
     */
    async writeLocalFile(content) {
      if (!fileHandle || !this.isHandleLocalFile) {
        return
      }
      if (!this.isFullDataFile) {
        content = content.root
      }
      let string = JSON.stringify(content)
      const writable = await fileHandle.createWritable()
      await writable.write(string)
      await writable.close()
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:48
     * @Desc: 创建本地文件
     */
    async createNewLocalFile() {
      await this.createLocalFile(exampleData)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:49:17
     * @Desc: 另存为
     */
    async saveLocalFile() {
      let data = getData()
      await this.createLocalFile(data)
    },

    /**
     * @Author: 黄拓
     * @Desc: 查看json
     */
    async test() {
      var content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
      let string = JSON.stringify(content)
      console.log('json:', string)
    },

    async newJson() {
      // var json =
      //   '{"root":{"data":{"text":"项目名称","expand":true,"isActive":false},"children":[{"data":{"text":"用例名称1","expand":true,"isActive":false},"children":[{"data":{"text":"前提条件1","expand":true,"isActive":false},"children":[{"data":{"text":"步骤1","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果1","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"步骤2","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果2","expand":true,"isActive":false},"children":[]}]}]}]},{"data":{"text":"用例名称2","expand":true,"isActive":false},"children":[{"data":{"text":"前提条件2","expand":true,"isActive":false},"children":[{"data":{"text":"步骤3","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果3","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"步骤4","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果4","expand":true,"isActive":false},"children":[]}]}]}]}]},"theme":{"template":"classic2","config":{}},"layout":"logicalStructure","config":{},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-434,"translateY":-8,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-434,"f":-8},"state":{"scale":1,"x":-434,"y":-8,"sx":0,"sy":0}}}'
      // 
      var json = '{"layout":"logicalStructure","root":{"data":{"text":"项目名称","expand":true,"isActive":false,"borderColor":"#000000","borderWidth":2},"children":[{"data":{"text":"用例目录1","expand":true,"isActive":false,"borderColor":"#000000","borderWidth":2},"children":[{"data":{"text":"用例名称1","expand":true,"isActive":false,"fillColor":"#73D8FF","borderColor":"#000000","borderWidth":1},"children":[{"data":{"text":"前提条件1","expand":true,"isActive":false,"borderDasharray":"5,5","borderWidth":1,"borderColor":"#000000"},"children":[{"data":{"text":"测试步骤1","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果1","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"测试步骤2","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果2","expand":true,"isActive":false},"children":[]}]}]}]},{"data":{"text":"用例名称2","expand":true,"isActive":false,"fillColor":"#73D8FF","borderColor":"#000000","borderWidth":1},"children":[{"data":{"text":"前提条件2","expand":true,"isActive":false,"borderDasharray":"5,5","borderWidth":1,"borderColor":"#000000"},"children":[{"data":{"text":"测试步骤3","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果3","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"测试步骤4","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果4","expand":true,"isActive":false},"children":[]}]}]}]}]},{"data":{"text":"用例目录2","expand":true,"isActive":false,"borderColor":"#000000","borderWidth":2},"children":[{"data":{"text":"用例名称3","expand":true,"isActive":false,"fillColor":"#73D8FF","borderColor":"#000000","borderWidth":1},"children":[{"data":{"text":"前提条件3","expand":true,"isActive":false,"borderDasharray":"5,5","borderWidth":1,"borderColor":"#000000"},"children":[{"data":{"text":"测试步骤5","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果5","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"测试步骤6","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果6","expand":true,"isActive":false},"children":[]}]}]}]},{"data":{"text":"用例名称4","expand":true,"isActive":false,"fillColor":"#73D8FF","borderColor":"#000000","borderWidth":1},"children":[{"data":{"text":"前提条件4","expand":true,"isActive":false,"borderDasharray":"5,5","borderWidth":1,"borderColor":"#000000"},"children":[{"data":{"text":"测试步骤7","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果7","expand":true,"isActive":false},"children":[]}]},{"data":{"text":"测试步骤8","expand":true,"isActive":false},"children":[{"data":{"text":"预计结果8","expand":true,"isActive":false},"children":[]}]}]}]}]}]},"theme":{"template":"classic2","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-731,"translateY":-144,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-731,"f":-144},"state":{"scale":1,"x":-731,"y":-144,"sx":-731,"sy":-144}}}'
      localStorage.setItem('SIMPLE_MIND_MAP_DATA', json)
      this.$router.go(0)
      console.log('新建json成功:', json)
    },

    async showJson() {
      let data = getData()
      await this.showJson(data)
    },

    async showJson(content) {
      try {
        // content = localStorage.getItem('mindData')
        content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
        let string = JSON.stringify(content)
        console.log('json:', content)
        this.toExcel(content)
      } catch (error) {
        console.log(error)
      }
    },

    //不包含用例目录
    async toExcel1(content) {
      // content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
      // console.log(JSON.parse(content))
      try {
        content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
        const xlsx = require('xlsx')
        const data = JSON.parse(content)
        const caseTitle = data.root.data.text
        const sheet = xlsx.utils.json_to_sheet([])
        const headers = ['用例名称', '前提条件', '用例步骤', '预计结果']
        xlsx.utils.sheet_add_aoa(sheet, [headers], { origin: 'A1' })
        let row = 2
        let caseNameIndex = 1
        let expectedIndex = 1
        data.root.children.forEach((testCase, index) => {
          const directoryName = testCase.data.text
          if (testCase.data.text == '') {
            this.$message({
              showClose: true,
              message: '标题格式不正确，请检查用例标题是否完整',
              type: 'error'
            })
          } else if (testCase.children == '') {
            this.$message({
              showClose: true,
              message: '前提条件格式不正确，请检查前提条件是否完整',
              type: 'error'
            })
          }
          const caseNames = []
          testCase.children.forEach(caseAll => {
            const caseName = caseAll.data.text
            if (caseAll.children == '') {
              this.$message({
                showClose: true,
                message: '测试步骤格式不正确，请检查步骤是否完整',
                type: 'error'
              })
              return
            }
            const caseNameName = []
            const expectedResults = []
            caseAll.children.forEach(result => {
              caseNameName.push(result.data.text)
              if (result.children == '') {
                this.$message({
                  showClose: true,
                  message: '预期结果格式不正确，请检查预期结果是否完整',
                  type: 'error'
                })
              }
              expectedResults.push(result.children[0].data.text.trim())
            })
            caseNames.push([
              caseName,
              caseNameName.join('\n'),
              expectedResults.join('\n')
            ])
          })
          console.log('caseNames:', caseNames)
          const rowValues = [directoryName]
          var caseNameIndextemp = ''
          var expectedtemp = ''
          // console.log('caseNames[1]',caseNames[0][1]).split('\n')
          caseNames[0][1].split('\n').forEach(item => {
            caseNameIndextemp = caseNameIndextemp + `${caseNameIndex + '、' + item}` + '\n'
            caseNameIndex++
          })
          caseNames[0][2].split('\n').forEach(item => {
            expectedtemp =
              expectedtemp + `${expectedIndex + '、' + item}` + '\n'
            expectedIndex++
          })
          caseNameIndex = 1
          expectedIndex = 1



          caseNames.forEach(caseName => {
            rowValues.push(
              caseName[0],
              caseNameIndextemp.substring(0, caseNameIndextemp.lastIndexOf('\n')),
              expectedtemp.substring(0, expectedtemp.lastIndexOf('\n'))
            )
          })
          //['用例名称1', '前提条件1', '1、步骤1\n2、步骤2', '1、预计结果1\n2、预计结果2']
          console.log('rowValues:', rowValues)
          xlsx.utils.sheet_add_aoa(sheet, [rowValues], { origin: `A${row}` })
          row++
        })


        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1')
        sheet['!cols'] = headers.map(() => ({ width: 25, wrapText: true }))
        xlsx.writeFile(workbook, caseTitle + '.xlsx')
      } catch (error) {
        console.log(error)
      }
    },

    //包含用例目录
    async toExcel2(content) {
      // content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
      // console.log(JSON.parse(content))
      try {
        content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
        const xlsx = require('xlsx')
        const data = JSON.parse(content)
        const caseTitle = data.root.data.text
        const sheet = xlsx.utils.json_to_sheet([])
        const headers = ['用例目录', '用例名称', '前提条件', '用例步骤', '预计结果']
        xlsx.utils.sheet_add_aoa(sheet, [headers], { origin: 'A1' })
        let row = 2
        let caseNameIndex = 1
        let expectedIndex = 1
        data.root.children.forEach((directory, index) => {
          //获取目录
          const directoryName = directory.data.text
          console.log('目录:', directoryName)
          if (directory.data.text == '') {
            this.$message({
              showClose: true,
              message: '用例目录不正确，请检查用例目录是否完整',
              type: 'error'
            })
          } else if (directory.children == '') {
            this.$message({
              showClose: true,
              message: '用例名称格式不正确，请检查用例名称是否完整',
              type: 'error'
            })
          }
          let caseNames = []
          var caseName = ''
          var casebeforeName = ''
          directory.children.forEach(caseAll => {
            //获取用例名称
            caseName = caseAll.data.text
            console.log('用例名称:', caseName)
            if (caseAll.children == '') {
              this.$message({
                showClose: true,
                message: '测试前提条件不正确，请检查前提条件是否完整',
                type: 'error'
              })
              return
            }
            const caseSteps = []
            const expectedResults = []
            caseAll.children.forEach(casebefore => {
              //获取前提条件
              casebeforeName = casebefore.data.text
              // caseNameName.push(casebefore.data.text)
              if (casebefore.children == '') {
                this.$message({
                  showClose: true,
                  message: '用例步骤格式不正确，请检查用例步骤是否完整',
                  type: 'error'
                })
              }
              var stepindex = 1
              casebefore.children.forEach(caseStep => {
                caseSteps.push(stepindex + '、'+ caseStep.data.text.trim())
                if (caseStep.children == '') {
                  this.$message({
                    showClose: true,
                    message: '预期结果格式不正确，请检查预期结果是否完整',
                    type: 'error'
                  })
                }
                expectedResults.push(stepindex + '、'+ caseStep.children[0].data.text.trim())
                stepindex ++
              })
            })
            caseNames.push([
              directoryName,
              caseName,
              casebeforeName,
              caseSteps.join('\n'),
              expectedResults.join('\n')
            ])
            console.log('caseNames', caseNames)
          })
          var rowValues = []
          caseNames.forEach(caseName => {
            rowValues = caseName
            xlsx.utils.sheet_add_aoa(sheet, [rowValues], { origin: `A${row}` })
            row++
          })
          console.log('rowValues:', rowValues)
        })


        //生成excel
        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1')
        sheet['!cols'] = headers.map(() => ({ width: 30, wrapText: true }))
        xlsx.writeFile(workbook, caseTitle + '.xlsx')
      } catch (error) {
        console.log(error)
      }
    },

    //包含全部用例列
    async toExcel(content) {
      // content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
      // console.log(JSON.parse(content))
      try {
        content = localStorage.getItem('SIMPLE_MIND_MAP_DATA')
        const xlsx = require('xlsx')
        const data = JSON.parse(content)
        const caseTitle = data.root.data.text
        const sheet = xlsx.utils.json_to_sheet([])
        const headers =  ['用例目录','用例名称','需求ID','前置条件','用例步骤','预期结果','用例类型','用例状态','用例等级','创建人','是否完成自动化','不可自动化原因','用例关键字','序号']
        xlsx.utils.sheet_add_aoa(sheet, [headers], { origin: 'A1' })
        let row = 2
        let caseNameIndex = 1
        let expectedIndex = 1
        data.root.children.forEach((directory, index) => {
          //获取目录
          const directoryName = directory.data.text
          console.log('目录:', directoryName)
          if (directory.data.text == '') {
            this.$message({
              showClose: true,
              message: '用例目录不正确，请检查用例目录是否完整',
              type: 'error'
            })
          } else if (directory.children == '') {
            this.$message({
              showClose: true,
              message: '用例名称格式不正确，请检查用例名称是否完整',
              type: 'error'
            })
          }
          let caseNames = []
          var caseName = ''
          var casebeforeName = ''
          directory.children.forEach(caseAll => {
            caseName = caseAll.data.text
            console.log('用例名称:', caseName)
            if (caseAll.children == '') {
              this.$message({
                showClose: true,
                message: '测试前提条件不正确，请检查前提条件是否完整',
                type: 'error'
              })
              return
            }
            const caseSteps = []
            const expectedResults = []
            caseAll.children.forEach(casebefore => {
              casebeforeName = casebefore.data.text
              // caseNameName.push(casebefore.data.text)
              if (casebefore.children == '') {
                this.$message({
                  showClose: true,
                  message: '用例步骤格式不正确，请检查用例步骤是否完整',
                  type: 'error'
                })
              }
              var stepindex = 1
              casebefore.children.forEach(caseStep => {
                caseSteps.push(stepindex + '、'+ caseStep.data.text.trim())
                if (caseStep.children == '') {
                  this.$message({
                    showClose: true,
                    message: '预期结果格式不正确，请检查预期结果是否完整',
                    type: 'error'
                  })
                }
                expectedResults.push(stepindex + '、'+ caseStep.children[0].data.text.trim())
                stepindex ++
              })
            })
            caseNames.push([
              directoryName,
              caseName,
              '',
              casebeforeName,
              caseSteps.join('\n'),
              expectedResults.join('\n'),
              '功能测试',
              '正常',
              'Level1',
              '黄拓',
              '否'
            ])
            console.log('caseNames', caseNames)
          })
          var rowValues = []
          caseNames.forEach(caseName => {
            rowValues = caseName
            xlsx.utils.sheet_add_aoa(sheet, [rowValues], { origin: `A${row}` })
            row++
          })
          console.log('rowValues:', rowValues)
        })


        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1')
        sheet['!cols'] = headers.map(() => ({ width: 30, wrapText: true }))
        xlsx.writeFile(workbook, caseTitle + '测试用例.xlsx')
      } catch (error) {
        console.log(error)
      }
    },

    async createLocalFile(content) {
      try {
        let _fileHandle = await window.showSaveFilePicker({
          types: [
            {
              description: '',
              accept: { 'application/json': ['.smm'] }
            }
          ],
          suggestedName: '思维导图'
        })
        if (!_fileHandle) {
          return
        }
        const loading = this.$loading({
          lock: true,
          text: '正在创建文件',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        fileHandle = _fileHandle
        this.$store.commit('setIsHandleLocalFile', true)
        this.isFullDataFile = true
        await this.writeLocalFile(content)
        await this.readFile()
        loading.close()
      } catch (error) {
        console.log(error)
        if (error.toString().includes('aborted')) {
          return
        }
        this.$message.warning(
          '你的浏览器可能不支持，建议使用最新版本的Chrome浏览器'
        )
      }
    },
    emit: (...agrs) => bus.emit(...agrs)
  }
}
</script>

<style lang="less" scoped>
.toolbarContainer {
  .toolbar {
    // position: fixed;
    // left: 50%;
    // transform: translateX(-50%);
    // top: 20px;
    // width: max-content;
    // max-width: 100%;
    // display: flex;
    // font-size: 12px;
    // font-family: PingFangSC-Regular, PingFang SC;
    // font-weight: 400;
    // color: rgba(26, 26, 26, 0.8);
    // z-index: 2;
    // overflow-x: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    padding: 0 20px;
    padding-top: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 26, 26, 0.8);
    z-index: 2;
    overflow-x: auto;

    .toolbarBlock {
      display: flex;
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      margin-right: 20px;
      flex-shrink: 0;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .toolbarBtn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }

      &:hover {
        &:not(.disabled) {
          .icon {
            background: #f5f5f5;
          }
        }
      }

      &.disabled {
        color: #bcbcbc;
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon {
        display: flex;
        height: 26px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 0 5px;
      }

      .text {
        margin-top: 3px;
      }
    }
  }
}
</style>
