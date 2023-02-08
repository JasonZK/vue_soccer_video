<template>
    <div style="height: 100%">
        <el-container style="height: 100%">

            <el-container>
                <el-header style="font-size: 30px; border-bottom: 1px solid #ccc; display: flex">
                    足球事件检测

                </el-header>

                <el-tabs label="业务视频" name="second">
                    <div>
                        <el-form ref="form" :model="videoForm" label-width="80px">
                            <el-form-item style="text-align: center">
                                <el-upload
                                        class="avatar-uploader el-upload--text"
                                        :drag="Plus"
                                        action="http://localhost:8001/api/uploadVideo3"
                                        multiple
                                        :show-file-list="false"
                                        :data="{ SavePath: this.Path.url }"
                                        :on-success="handleVideoSuccess"
                                        :before-upload="beforeUploadVideo"
                                        :on-progress="uploadVideoProcess"
                                >
                                    <i v-if="Plus" class="el-icon-upload"></i>
                                    <div v-if="Plus" class="el-upload__text">
                                        将文件拖到此处，或<em>点击上传</em>
                                    </div>

                                    <el-progress
                                            v-if="videoFlag == true"
                                            type="circle"
                                            :percentage="videoUploadPercent"
                                            style="margin-top: 30px"
                                    ></el-progress>

                                    <div class="el-upload__tip" slot="tip">
                                        只能上传mp4/flv/avi文件，且不超过800M
                                    </div>
                                </el-upload>
                            </el-form-item>

                        </el-form>
                    </div>

                </el-tabs>

                <el-main>
                    <el-table :data="tableData" border stripe>
                        <el-table-column prop="videoName" label="视频名称" width="340">
                        </el-table-column>
                        <el-table-column prop="videoSize" label="大小(MB)" width="340">
                        </el-table-column>
                        <el-table-column prop="createdTime" label="上传时间">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <el-button type="success" @click="toDetectEvent(scope.row.videoId)">事件检测 <i class="el-icon-edit"></i></el-button>
                                <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "mainpage",
        data() {
            return {
                tableData: [],
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false,
                sideWidth: 200,
                logoTextShow: true,

                //视频部分
                videoForm: {
                    videoId: '',
                    videoUrl: ''
                },
                videoFlag: false,
                Plus: true,
                //上传视频时带的参数，这个地址就是后端保存磁盘的地址。可以更改。不建议放F盘，有的电脑可能没有F盘，只有C和D
                Path: {
                    url: 'D:/dataset/video_upload'
                },
                videoUploadPercent: 0
            }
        },

        created() {
            this.getVideoInfo();
        },

        methods: {
            collapse() {
                this.isCollapse = !this.isCollapse
                // 收缩
                if (this.isCollapse){
                    this.sideWidth = 64
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logoTextShow = false
                }
                // 展开
                else{
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logoTextShow = true
                }
            },

            //获取video表格数据
            getVideoInfo() {
                request.get("/table").then(res => {
                    this.tableData = res;
                    console.log(res);
                });
            },

            toDetectEvent(videoId) {
                this.$router.push({path: "/event", query: {videoId: videoId}})
            },

            //视频部分
            // 视频上传前执行
            beforeUploadVideo (file) {
                //文件大小
                const isLt2000M = file.size / 1024 / 1024 < 2000
                //视频后缀检查
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
                    this.$message.error('请上传正确的视频格式')
                    return false
                }
                if (!isLt2000M) {
                    this.$message.error('上传视频大小不能超过2000MB哦!')
                    return false
                }
            },
            // 视频上传过程中执行
            uploadVideoProcess (event, file, fileList) {
                this.Plus = false
                this.videoFlag = true
                this.videoUploadPercent =+ file.percentage.toFixed(0)
            },
            // 视频上传成功时执行
            handleVideoSuccess (res, file) {
                this.Plus = false
                this.videoUploadPercent = 100
                console.log(res)
                // 如果为200代表视频保存成功
                if (res.resCode === '200') {
                    // 接收视频传回来的名称和保存地址
                    // 至于怎么使用看你啦~
                    this.videoForm.videoId = res.newVidoeName
                    this.videoForm.videoUrl = res.VideoUrl
                    this.$message.success('视频上传成功！')
                    this.getVideoInfo();
                } else {
                    this.$message.error('视频上传失败，请重新上传！')
                }
            }
        }
    }
</script>

<style>
    .el-header {
        background-color: #ffffff;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>