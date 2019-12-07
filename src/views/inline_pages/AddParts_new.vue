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
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 分隔 -->
          <el-form-item label="用户名" >
            <el-input label="用户名" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  label="头像">
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
          <el-form-item  label="评论时间">
            <el-date-picker v-model="discusstime" type="datetime" placeholder="设置评论时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="handleMsgSure">确定</el-button>
            <el-button @clcik.native.prevent="handleMsgReset">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="课程物料" name="10005" align-center>
        <el-form label-width="110px" style="margin:20px;width:60%;min-width:600px;">
          <!-- 分隔 -->
          <el-form-item label="课程前端展示名称" >
            <el-input placeholder=""></el-input>
          </el-form-item>

          
          <el-form-item  label="课程头图">
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
          <el-form-item  label="评论时间">
            <el-date-picker v-model="discusstime" type="datetime" placeholder="设置评论时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="handleMsgSure">确定</el-button>
            <el-button @clcik.native.prevent="handleMsgReset">取消</el-button>
          </el-form-item>
        </el-form>


      </el-tab-pane>
      <el-tab-pane label="预约电话" name="30001" align-center>
        
      </el-tab-pane>
      <el-tab-pane label="咨询电话" name="30002" align-center>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createPart, checkShopState } from "../../api/api.js";
import qs from "qs";

export default {
  data() {
    return {
      discusstime:"",
      rate: 5,
      value: "",
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
    handleMsgSure(){

    },
    handleMsgReset(){

    },
    handlePartSuccess(res, file) {
      this.form.avant = res.data;
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
    onSubmit() {
      //console.log('submit!');
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
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
</style>