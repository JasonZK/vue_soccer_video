<template>
  <div class="release_wrap">
    <div class="release_title">足 球 视 频</div>
    <el-card class="release_card">
      <el-button
        type="primary"
        round
        icon="el-icon-arrow-left"
        style="margin-bottom: 40px"
        @click="jump_home"
      >返回</el-button
      >

      <el-table stripe :data="tableData" style="width: 80%" height="300px">
        <el-table-column prop="videoName" label="视频名称" min-width="280">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="playVideo(scope.$index, scope.row)"
            >播放</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :modal="false"
      title="视频播放"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <p class="video_title">{{videoName}}</p>
      <video
        :src="`http://localhost:8001/SelectVideo/${videoId}`"
        controls="controls"
        width="100%"
        @canplay="getVidDur()"
        id="myvideo"
      ></video>
    </el-dialog>
  </div>
</template>

<script>
  import request from "../utils/request";

  var video = () => {
    var videoTime = document.getElementById("myvideo");
    console.log(videoTime.duration); //获取视频时长
    console.log(videoTime.currentTime); //获取视频当前播放时间
  };
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        title: "",
        videolist: "",
        //表格数据
        tableData: [],
        //弹框组件隐藏
        dialogVisible: false,
        //用于保存视频的id
        videoId: 0,
        //保存视频的名称
        videoName:''
      };
    },
    computed: {
      //引入vuex中state的变量，可以直接this.xxx调用到
      ...mapState(["article"]),
    },
    created() {
      this.getVideoInfo();
    },
    methods: {
      jump_home() {
        this.$router.go(-1);
      },
      getVidDur() {
        video();
      },
      //获取video表格数据
      getVideoInfo() {
        request.get("/table").then(res => {
          this.tableData = res;
          console.log(res);
        });
      },
      //点击播放按钮
      playVideo(i, val) {
        //显示弹框
        this.dialogVisible = true;
        //保存视频名字
        this.videoName=val.videoName;
        //保存视频id
        this.videoId=val.id;
        console.log(i, val);
      },
    },
  };
</script>

<style  scoped lang='scss'>
  .release_wrap {
    background-image: url("../assets/logo.png");
    width: 100%;
    height: 100%;
    position: relative;
  }
  //卡片效果
  .release_card {
    width: 70%;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
    0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
    0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    transition: 0.5s ease; //改变大小
    &:hover {
      box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
      0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
      0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  // title效果
  .release_title {
    text-align: center;
    font-size: 38px;
    font-weight: bold;
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Lato, sans-serif; //字体
    letter-spacing: 4px; //字符间距空白
    text-transform: uppercase; //转换文本，控制大小写
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(0, 0, 0, 1) 100%
    );
    background-size: 80%; //背景大小
    background-repeat: no-repeat; //背景平铺不重复
    // below two lines create text gradient effect
    color: rgba(237, 227, 231, 0.7); //颜色透明
    -webkit-background-clip: text; //规定背景的绘制区域在文字上
    animation: shining 3s linear infinite;
  }
  @keyframes shining {
    from {
      background-position: -500%; //背景图像的起始位置
    }
    to {
      background-position: 500%; //背景图像的结束位置
    }
  }
  .video_title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 3px;
  }
</style>
