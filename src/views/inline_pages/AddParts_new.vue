<template>
  <!-- 新增物料页面 -->
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="店铺相册" name="10007">
        <span>至少上传三张图片:</span>
        <el-upload
          action="http://192.168.202.190:8081/openApi/account_upload"
          list-type="picture-card"
          name="media"
          :headers="headers"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePartSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-row>
          <el-button type="primary" @click="handleSubmitImg">提交</el-button>
          <el-button type="warning" @click="handleClickNext">取消</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="教育评论" name="10006" align-center>
        <el-form label-width="110px" style="margin:20px;width:60%;min-width:600px;">
          <el-form-item label="店铺列表">
            <el-select v-model="shopList" placeholder="请选择">
              <el-option
                v-for="item in shopListData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 分隔 -->
          <el-form-item label="用户名">
            <el-input style="width:220px" label="用户名" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              limit="1"
              :headers="headers"
              name="media"
              action="http://192.168.202.190:8081/openApi/account_upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-error="PicLicenseErr"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="评分">
            <el-rate v-model="rate" show-score text-color="#ff9900" score-template="{rate}"></el-rate>
          </el-form-item>
          <el-form-item label="评论时间">
            <el-date-picker v-model="discusstime" type="datetime" placeholder="设置评论时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="handleMsgSure">确定</el-button>
            <el-button @clcik.native.prevent="handleMsgReset">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      
      <el-tab-pane label="教育课程" name="10005" align-center>
        <el-form label-width="130px" style="margin:20px;width:60%;min-width:600px;">
          <!-- 分隔 -->
          <el-form-item label="课程前端展示名称">
            <el-input v-model="lp_parts_name"></el-input>
          </el-form-item>

          <el-form-item label="课程类目">
            <el-select v-model="category" placeholder="请选择">
              <el-option
                v-for="item in categoryjson"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课程头图">
            <el-upload
              limit="1"
              :headers="headers"
              name="media"
              action="http://192.168.202.190:8081/openApi/account_upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="picLessonHeaderImg"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" />
            </el-dialog>
          </el-form-item>

          <el-form-item label="课程类型">
            <el-radio v-model="lessontype" label="正式课">正式课</el-radio>
            <el-radio v-model="lessontype" label="体验课">体验课</el-radio>
          </el-form-item>

          <el-form-item label="课程最低价" style="width:200px">
            <el-input min="0.01" v-model="minPrice"></el-input>
          </el-form-item>

          <el-form-item label="课程最高价" style="width:200px">
            <el-input v-model="maxPrice"></el-input>
          </el-form-item>
          <el-form-item label="授课形式">
            <el-checkbox-group v-model="course_mode">
              <el-checkbox label="线下授课"></el-checkbox>
              <el-checkbox label="线上直播"></el-checkbox>
              <el-checkbox label="线上录播"></el-checkbox>
              <el-checkbox label="双师课堂"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          
          <el-form-item label="特色服务">
            <el-checkbox-group v-model="tags" :max="3">
              <el-checkbox label="免费试听"></el-checkbox>
              <el-checkbox label="家长旁听"></el-checkbox>
              <el-checkbox label="支持退费"></el-checkbox>
              <el-checkbox label="外教授课"></el-checkbox>
              <el-checkbox label="封闭住宿"></el-checkbox>
              <el-checkbox label="免费重读"></el-checkbox>
              <el-checkbox label="外教小班"></el-checkbox>
              <el-checkbox label="外教一对一"></el-checkbox>
              <el-checkbox label="小班教学"></el-checkbox>
              <el-checkbox label="外教数学"></el-checkbox>
              <el-checkbox label="一对一教学"></el-checkbox>
            </el-checkbox-group>
            <span class="desc_span">最多选三项</span>
          </el-form-item>
          <!-- 是否支持免费试听 -->
          <el-form-item label="是否支持免费试听">
            <el-radio v-model="experience_info" label="1">是</el-radio>
            <el-radio v-model="experience_info" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="适合基础">
            <el-input v-model="level" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="上课人数">
            <el-select v-model="attendee_capacity" placeholder="上课人数">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级信息">
            <el-button @click="addClass">添加班级</el-button>
          </el-form-item>
          <!-- 添加班级信息的模板 -->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="班级名称">
                  <el-input v-model="classinfo.class_name"></el-input>
                </el-form-item>
                <el-form-item label="上课时间">
                  <el-input v-model="classinfo.class_time"></el-input>
                </el-form-item>
                <el-form-item label="开班时间">
                  <el-input v-model="classinfo.start_time"></el-input>
                </el-form-item>
                <el-form-item label="课程数量">
                  <el-input v-model="classinfo.lesson_count"></el-input>
                </el-form-item>
                <el-form-item label>
                  <el-button @click.native.prevent="saveClassInfo">保存</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 添加成功的班级信息模板-->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="班级名称">
                  <el-input v-model="classinfo.class_name"></el-input>
                </el-form-item>
                <el-form-item label="上课时间">
                  <el-input v-model="classinfo.class_time"></el-input>
                </el-form-item>
                <el-form-item label="开班时间">
                  <el-input v-model="classinfo.start_time"></el-input>
                </el-form-item>
                <el-form-item label="课程数量">
                  <el-input v-model="classinfo.lesson_count"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button @click.native.prevent="editClassInfo">编辑</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          
          <!-- 课程亮点 -->
          <el-form-item label="课程亮点">
            <el-button @click="addHightLight">添加课程亮点</el-button>
          </el-form-item>
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="亮点类型">
                  <el-select v-model="highlight.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="highlight.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleHighLightImgSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="saveHigLightImg">保存</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 添加课程亮点成功，显示-->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="亮点类型">
                  <el-select v-model="highlight.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="highlight.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleHighLightImgSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="editHigLightImg">保存</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          
          <!-- 适用对象 -->
          <el-form-item label="适用对象">
            <el-button @click="addAudienceTpye">添加适用对象</el-button>
          </el-form-item>
          <!-- 添加 -->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="适用对象">
                  <el-select v-model="audience_type.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="audience_type.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="audienceImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="saveAudience">保存</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!--编辑适用对象-->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="适用对象">
                  <el-select v-model="audience_type.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="audience_type.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="audienceImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="editAudience">编辑</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 学习目标 -->
          <el-form-item label="学习目标">
            <el-button @click="addObjective">添加学习目标</el-button>
          </el-form-item>
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="学习目标">
                  <el-select v-model="objective.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="objective.text"
                     
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="objectiveImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="saveObjective">保存</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 编辑学习目标显示-->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="学习目标">
                  <el-select v-model="objective.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="objective.text"
                     
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="objectiveImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native.prevent="saveObjective">编辑</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 课程内容 -->
          <el-form-item label="课程内容">
            <el-button @click="addCourse">添加课程内容</el-button>
          </el-form-item>
          <!-- 课程内容 -->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="课程内容">
                  <el-select v-model="course_content.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="course_content.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="addCourseImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>

                <el-form-item>
                  <el-button>保存</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>
          <!-- 编辑对象，显示-->
          <el-form-item>
            <template>
              <el-form label-width="100px">
                <el-form-item label="课程内容">
                  <el-select v-model="course_content.content_type" placeholder="请选择">
                    <el-option
                      v-for="item in light_high_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="course_content.text"
                    show-word-limit
                  ></el-input>
                  <!-- 课程图片 -->
                  <el-upload style="position:relative;"
                    action="http://192.168.202.190:8081/openApi/account_upload"
                    list-type="picture-card"
                    name="media"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="addCourseImgAdress"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <ul class="upload_rule">
                    <li>1.不得恶意诋毁其他商家</li>
                    <li>2.所填写需为课程亮点内容</li>
                    <li>3.上传图片/文字不带有特殊字符，二维码，联系方式</li>
                    <li>4.不得夸张虚假宣传</li>
                  </ul>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>

                <el-form-item>
                  <el-button @click.native.prevent="editCourse">编辑</el-button>
                  <el-button @click.native.prevent="">取消</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-form-item>

          <!-- 最后提交信息 -->
          <el-form-item>
            <el-button @click.native.prevent="handleMsgSure">确定</el-button>
            <el-button @clcik.native.prevent="handleMsgReset">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="预约电话" name="30001" align-center>
        <el-form label-width="110px" style="margin:20px;width:60%;min-width:600px;">
          <el-form-item label="店铺列表">
            <el-select v-model="shopList" placeholder="请选择">
              <el-option
                v-for="item in shopListData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input type="number"></el-input>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="咨询电话" name="30002" align-center>
        <el-form label-width="110px" style="margin:20px;width:60%;min-width:600px;">
          <el-form-item label="店铺列表">
            <el-select v-model="shopList" placeholder="请选择">
              <el-option
                v-for="item in shopListData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input type="number"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createPart, checkShopState } from "../../api/api.js";
import qs from "qs";
import category from "../../common/js/Category.js";

export default {
  data() {
    return {
      shopListData:[],
      course_content:{
        content_type:"",
        text:"",
        image:""
      },
      objective:{
        content_type:"",
        text:"",
        image:""
      },
      audience_type:{
        content_type:"",
        text:"",
        image:""
      },
      highlight:{
        content_type:"",
        text:"",
        image:""
      },
      classinfo:{
        class_name:"",
        class_time:"",
        start_time:"",
        lesson_count:""
      },
      headerImg:"",
      lp_parts_name:"",
      categoryjson:categoryjson,
      category:"",
      light_high_type: [
        {
          value: "text",
          label: "文字"
        },
        {
          value: "image",
          label: "图片"
        }
      ],
      light_high_text: "",
      shopList:"",
      options: [
        {
          value: "1对1",
          label: "1对1"
        },
        {
          value: "10人以下",
          label: "10人以下"
        },
        {
          value: "11-20人",
          label: "11-20人"
        },
        {
          value: "20人以上",
          label: "20人以上"
        }
      ],
      level: "",
      experience_info: "",
      tags: [],
      course_mode: [],
      minPrice: "",
      maxPrice: "",
      lessontype: "",
      discusstime: "",
      rate: 5,
      attendee_capacity: "",
      options: [
        {
          value: "value1",
          label: "label1"
        },
        {
          value: "value2",
          label: "label2"
        }
      ],
      activeName: "10007",
      form: {
        images: [],
        business_name: "",
        region: "",
        brand_name: "",
        qua_types: "",
        bus_lic_types: "",
        startime: "",
        endtime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        avant: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    headers() {
      return {
        ContentType: "multipart/form-data"
      };
    }
  },
  methods: {
    editCourse(){},
    addCourse(){},
    saveObjective(){},
    editObjective(){},
    addObjective(){},
    editAudience(){},
    saveAudience(){
    },
    addCourseImgAdress(res,file){
      this.course_content.image=res.data;
    },
    audienceImgAdress(res,file){
      this.audience_type.image=res.data;
    },
    addAudienceTpye(){
      
    },
    saveHigLightImg(){
      //
    },
    addHightLight(){},
    picLesson(){},
    saveClassInfo(){},
    editClassInfo(){},
    picLessonHeaderImg(res,file){
      this.headerImg=res.data;
    },
    addClass() {
      //添加班级模块打开 
    },
    handleMsgSure() {},
    handleMsgReset() {},
    handlePartSuccess(res, file) {
     // this.form.avant = res.data;
    },
    handleHighLightImgSuccess(res,file){
      this.highlight.image=res.data;
    },
    PicLicenseErr(err, file, fileList) {
      console.log(err);
    },
    handleSubmitImg() {
      let str = sessionStorage
        .getItem("merchantsId")
        .match(/\d+/g)
        .join();
      let littleJson = { images: this.form.images };
      let params = {
        merchants_id: str,
        shop_id: "77079236920110",
        material_type: this.activeName,
        material_content: JSON.stringify(littleJson)
      };
      params = qs.stringify(params);
      createPart(params).then(data => {
        if (data.unique_key !== "") {
          this.$message({
            message: "创建成功",
            type: "success"
          });
        }
      });
    },
    objectiveImgAdress(res,file){
      this.objective.image=res.data;
    },
    handleClickNext() {
      this.$router.push({ path: "/addParts" });
    },
    handleSubmitedInfo() {
      this.$router.push({ path: "/submitedInfo" });
    },
    handleClick(tab, event) {
      if (tab.name === "10006") {
        let params = {};
        checkShopState(params).then(data => {});
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scope>
.width_limit {
  min-width: 109px;
}
.el-form .el-form-item {
  position: relative;
}
.must_write::before {
  content: "*";
  font-size: 1em;
  color: red;
  position: absolute;
  margin: 12px 30px 0;
  z-index: 1;
}
._fixmust::before {
  margin: 12px 0px 0;
  z-index: 1;
}
._spin::before {
  margin-left: -8px;
}
._spin3::before {
  margin-left: 12px;
}
._spin4::before {
  margin-left: 46px;
}
.desc_span {
  font-size: 12px;
  color: #ccc;
}
li{
  list-style-type: none;
}
.upload_rule{
  position: absolute;
  top:150px;
  left: 190px;
  font-size: 12px;
  color:#ccc;
  line-height: 20px
}
</style>