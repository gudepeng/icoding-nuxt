<template>
  <div>
    <el-form ref="form" :rules="rules" :model="article">
      <el-form-item prop="articleTitle">
        <el-input v-model="article.articleTitle" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" v-model="article.articleSummary" placeholder="文章摘要"></el-input>
      </el-form-item>
      <el-form-item prop="articleContent">
        <top-editor v-model="article.articleContent" :upload="upload" :options="options"></top-editor>
      </el-form-item>
      <!-- 自己写的编辑器 -->
      <!--<el-form-item prop="articleContent">
            <el-row>
              <el-col :span="12" style="height: 600px">
                <textarea style="width:100%;height:100%;resize: none;" v-model="article.articleContent"></textarea>
              </el-col>
              <el-col :span="12" style="height: 600px;overflow-y:scroll">
                <div style="width:100%;height: 100%;word-break: break-all;background: #ddd" v-html="articleContentShow"></div>
              </el-col>
            </el-row>
      </el-form-item>-->
      <el-form-item label="文章标签：" prop="articleTag">
        <el-tag
          :key="tag"
          v-for="tag in article.articleTag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </el-form-item>
      <el-form-item label="文章分类：" prop="sortId">
        <el-select v-model="article.sortId" placeholder="请选择">
          <el-option
            v-for="item in articleType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('publish')" round>发布</el-button>
        <el-button type="primary" @click="publish('draft')" round>存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import TopEditor from 'top-editor/src/lib/TopEditor.vue'
 /* import marked from '~/plugins/marked'*/
  export default {
    name: 'Publish',
    layout: 'mycenter',
    data () {
      return {
        articleContentShow:"",
        rules: {
          articleTitle: [
            {required: true, message: '请输入文章标题', trigger: 'blur'},
          ],
          articleContent: [
            {required: true, message: '请输入文章内容', trigger: 'blur'},
          ],
          articleTag: [
            {required: true, message: '请输入文章标签', trigger: 'blur'},
          ],
          sortId: [
            {required: true, message: '请选择文章类别', trigger: 'blur'},
          ],
        },
        article: {
          articleContent: "",
          articleSummary: "",
          articleTag: [],
          articleTitle: "",
          articleTitleimage: "",
          sortId: null,
        },
        inputVisible: false,
        inputValue: '',
        publishTip: '',
        articleID: this.$route.params.id || '',
        upload: {
          url: `${this.$store.getters.baseURL}/upload`,
          headers: {
            token: this.$store.state.token
          }
        },
        options: {}
      }
    },
    watch:{
      /*'article.articleContent':function(newQuestion, oldQuestion){
        this.articleContentShow = marked(newQuestion, null, true)
      }*/
    },
    computed: {
      articleType(){
        return this.$store.state.option.articleType
      }
    },
    async mounted () {
      if (process.browser) {
        this.options = {
          linkify: true,
          highlight (str, lang) {
            lang = lang || 'javascript'
            if (require('highlight.js').getLanguage(lang)) {
              try {
                return require('highlight.js').highlight(lang, str).value
              } catch (__) {
              }
            }
            return ''
          }
        }
      }
      // 有id就获取文章内容
      if (this.articleID) {
        await this.$store.dispatch('loadArticleDetail', {'article_id': this.articleID})
        let articleDetail = JSON.parse(JSON.stringify(this.$store.state.article.detail.data))
        articleDetail.articleTag = articleDetail.articleTag.split(',')
        this.article = articleDetail
      }
    },
    methods: {
      /*writeArticleContent(){
        this.articleContentShow = marked(this.article.articleContent, null, true)
      },*/
      async publish () {
        let pd = true
        this.$refs['form'].validate((valid) => {
          if (valid) {
          } else {
            pd = false
            return false;
          }
        });
        if (!pd) {
          return
        }
        let art = JSON.parse(JSON.stringify(this.article))
        art.articleTag = art.articleTag.join(",")
        await this.$store.dispatch('PUBLISH_ARTICLE', art)
        if (this.$store.state.article.publish.data.status === 0) {
          this.publishTip = '发布成功';
        }
      },
      //文章标签开始
      handleClose(tag) {
        this.article.articleTag.splice(this.article.articleTag.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.article.articleTag.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
      //文章标签结束
    },
    components: {
      TopEditor
    }
  }
</script>
<style scoped lang="scss">
  .el-tag {
    margin-right: 10px;
  }

  .el-tag + .el-tag {
    margin-right: 10px;
  }

  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
</style>
