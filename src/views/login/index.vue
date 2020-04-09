<template>
  <div class="login-container">

<!--    <el-row>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                   label-width="0px"
                   class="card-box login-form">
            <div class="login-top login-row">
              <a class="boardtop-left" href="/">
                <div>首 页</div>
              </a>
              <div class="login-logo">
                <img :src="logo" alt="学者网">
                &lt;!&ndash;<h3 class="title">后台管理系统</h3>&ndash;&gt;
              </div>
              <a @click="toUnitApply()" class="boardtop-right">
                <div>注 册</div>
              </a>
            </div>
            &lt;!&ndash;<h3 class="title">教师主页管理系统</h3>&ndash;&gt;
            <div class="input-row">
              <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
                <el-input v-model="loginForm.username" autoComplete="on"/>
              </el-form-item>
              <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
                <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                  登录
                </el-button>
              </el-form-item>
            </div>
            &lt;!&ndash;<el-button type="success" style="width:100%;" @click="toUnitApply()">&ndash;&gt;
            &lt;!&ndash;注册&ndash;&gt;
            &lt;!&ndash;</el-button>&ndash;&gt;
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>-->
    <!--<canvas id="canvas"></canvas>-->
    <div class="main-middle">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
               label-width="0px"
               class="card-box login-form">
        <div class="login-top login-row">
          <a class="boardtop-left" href="/index">
            <div>首 页</div>
          </a>
          <div class="login-logo">
            <img :src="logo" alt="学者网">
            <!--<h3 class="title">后台管理系统</h3>-->
          </div>
          <a @click="toUnitApply()" class="boardtop-right">
            <div>注 册</div>
          </a>
        </div>
        <!--<h3 class="title">教师主页管理系统</h3>-->
        <div class="input-row">
          <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
            <el-input v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
            <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                      autoComplete="on" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>

            <el-button type="primary" style="width:100%;" :loading="loading"  @click="visible = !visible">
              登录
            </el-button><!--@click.native.prevent="handleLogin"-->
          </el-form-item>
        </div>
        <!--<el-button type="success" style="width:100%;" @click="toUnitApply()">-->
        <!--注册-->
        <!--</el-button>-->
        <el-popover
          popper-class="slidingPictures"
          ref="popover"
          trigger="manual"
          v-model="visible"
          style="position: absolute;z-index: 999;margin-top: -55%;margin-left: 23%">
          <div class="sliding-pictures">
            <div class="vimg">
              <canvas id="sliderBlock"></canvas>
              <canvas id="codeImg"></canvas>
            </div>
            <div class="slider">
              <div class="track" :class="{ pintuTrue: puzzle }">
                {{ tips }}
              </div>
              <div class="button el-icon-s-grid" @mousedown.prevent="drag"></div>
            </div>
            <div class="operation">
 <span
   title="关闭验证码"
   @click="visible = false"
   class="el-icon-circle-close"
 ></span>
              <span
                title="刷新验证码"
                @click="canvasInit"
                class="el-icon-refresh-left"
              ></span>
            </div>
          </div>
        </el-popover>
      </el-form>

    </div>

  </div>
</template>
<script>
  import logo from '@/assets/img/logo.png'
  // import canvas from "@/assets/js/canvas.js"
  import bg from '@/assets/img/bg.png'

  export default {
    name: 'login',
    data() {
      return {
          logo,
          bg,
          loginForm: {
              username: '',
              password: '',
              host: 'unit'
          },
          loginRules: {
              username: [{required: true, trigger: 'blur', message: "请输入用户名"}],
              password: [{required: true, trigger: 'blur', message: "请输入密码"}]
          },

          loading: false,
          tips: "拖动左边滑块完成上方拼图",
          rules: {},
          visible: false,
          //滑块x轴数据
          slider: {
              mx: 0,
              bx: 0
          },
          puzzle: false,
      }

    },
      watch: {
          visible(e) {
              if (e === true) {
                  this.canvasInit();
                  this.puzzle = false;

              }
          }
      },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid&&this.puzzle ) {
            this.loading = true
            this.loginForm.host = 'unit'
            this.$store.dispatch('Login', this.loginForm).then(data => {
              this.loading = false
              if ("success" === data.result) {
                this.$router.push({path: '/'})
              } else {
                this.$message.error("账号/密码错误");
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      toUnitApply() {
        this.$router.push({name: 'unitApply'});
      },

        canvasInit() {
            //生成指定区间的随机数
            const random = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            //x: 254, y: 109
            let mx = random(127, 244),
                bx = 5,
                y = random(10, 99);
            this.slider = { mx, bx };
            this.draw(mx, bx, y);
        },
        //鼠标按下
        drag(e) {
            console.log("鼠标按下", e);
            let dom = e.target; //dom元素
            let slider = document.querySelector("#sliderBlock"); //滑块dom
            const downCoordinate = { x: e.x, y: e.y };
            //正确的滑块数据
            let checkx = Number(this.slider.mx) - Number(this.slider.bx);
            //x轴数据
            let x = 0;
            const move = moveEV => {
                x = moveEV.x - downCoordinate.x;
                //y = moveEV.y - downCoordinate.y;
                if (x >= 241 || x <= 0) return false;
                dom.style.left = x + "px";
                //dom.style.top = y + "px";
                slider.style.left = x + "px";
            };
            const up = () => {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
                dom.style.left = "";
                console.log(x, checkx);
                let max = checkx+5;
                let min = checkx - 10;
                //允许正负误差1
                if ((max >= x && x >= min) || x === checkx) {
                    console.log("滑动解锁成功");
                    this.puzzle = true;
                    this.tips = "验证成功";
                    setTimeout(() => {
                        this.visible = false;
                    }, 500);
                    this.handleLogin();
                } else {
                    console.log("拼图位置不正确");
                    this.tips = "验证失败，请重试";
                    this.puzzle = false;
                    this.canvasInit();
                }
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        },
        draw(mx = 200, bx = 20, y = 50) {
            let mainDom = document.querySelector("#codeImg");
            let bg = mainDom.getContext("2d");
            let width = mainDom.width;
            let height = mainDom.height;
            let blockDom = document.querySelector("#sliderBlock");
            let block = blockDom.getContext("2d");
            //重新赋值，让canvas进行重新绘制
            blockDom.height = height;
            mainDom.height = height;
            let imgsrc = this.bg;
            let img = document.createElement("img");
            img.style.objectFit = "scale-down";
            img.src = imgsrc;
            img.onload = function() {
                bg.drawImage(img, 0, 0, width, height);
                block.drawImage(img, 0, 0, width, height);
            };
            let mainxy = { x: mx, y: y, r: 9 };
            let blockxy = { x: bx, y: y, r: 9 };
            this.drawBlock(bg, mainxy, "fill");
            this.drawBlock(block, blockxy, "clip");
        },
        //绘制拼图
        drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
            let x = xy.x,
                y = xy.y,
                r = xy.r,
                w = 40;
            let PI = Math.PI;
            //绘制
            ctx.beginPath();
            //left
            ctx.moveTo(x, y);
            //top
            ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
            ctx.lineTo(x + w + 5, y);
            //right
            ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
            ctx.lineTo(x + w + 5, y + w);
            //bottom
            ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
            ctx.lineTo(x, y + w);
            ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
            ctx.lineTo(x, y);
            //修饰，没有会看不出效果
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.stroke();
            ctx[type]();
            ctx.globalCompositeOperation = "xor";
        }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #f5f5f5;
  $light_gray: #eee;
  .sliding-pictures {
    width: 100%;
    .vimg {
      width: 100%;
      height: 170px;
      #codeImg,
      #sliderBlock {
        padding: 7px 7px 0 7px;
        width: inherit;
        height: inherit;
      }
      #codeImg {
        //display: none;
      }
      #sliderBlock {
        position: absolute;
        z-index: 4000;
      }
    }
    .slider {
      width: 100%;
      height: 65px;
      border-bottom: #c7c9d0 1px solid;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .track {
        margin-left: 7px;
        width: 286px;
        height: 38px;
        background: rgba(28, 136, 188, 0.5);
        border-radius: 25px;
        font-size: 14px;
        line-height: 38px;
        padding-right: 15px;
        padding-left: 70px;
      }
      .pintuTrue {
        background: #67c23a;
        color: #ffffff;
      }
      .button {
        position: absolute;
        width: 50px;
        height: 50px;
        line-height: 48px;
        background: #ffffff;
        box-shadow: #b9bdc8 0 0 3px;
        border-radius: 50%;
        left: 7px;
        text-align: center;
        font-size: 28px;
        color: #3e5d8b;
        &:hover {
          color: #2181bd;
        }
      }
    }
    .operation {
      width: 100%;
      height: 40px;
      > span {
        color: #9fa3ac;
        display: inline-block;
        width: 40px;
        font-size: 25px;
        line-height: 40px;
        text-align: center;
        &:hover {
          background: #e2e8f5;
        }
      }
    }
  }

  .login-container {
    @include relative;
    height: calc(100vh - 98px);
    min-width: 980px;
/*    min-height: calc(100vh - 98px);
    max-height: calc(100vh - 50px);*/
    margin-top: 100px;
    /*background-color: #f1f1f1;*/
    /*background-color: #d4d5d6;*/
    background-image: url(../../assets/img/bg.png);
    background-size: cover;
    margin: 0 auto;

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $bg;
      height: 47px;
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 26px;
      color: $bg;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      width: 100%;
      max-width:600px;
      margin: auto;
      transform: translate(0, 38%);
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 0 7px 1px #c5c5c5;
      .login-top {
        justify-content: space-between;
        align-items: flex-end;
        background: #bbdefb;
        border-radius: 15px 15px 0 0;
      }

      .login-row {
        display: flex;
        flex-wrap: wrap;
        height: 140px;
        /*justify-content: center;*/
      }

      .input-row {
        height: 220px;
        background: white;
        padding: 14px;
        border-radius: 0 0 15px 15px;
      }

      .login-logo img {
        max-width: 100px;
        border-radius: 50%;
        margin: 1em 0 1em 0;
        box-shadow: 0 0 5px 0 #afafaf;
        user-select: none;
      }

      a.boardtop-left {
        color: white;
        background: #54aff9;
        padding: 3px 1.5em 2px 1.5em;
        border-radius: 0 10px 0 0;
        box-shadow: 0 0 5px 0px #969696;
        position: relative;
      }

      a.boardtop-right {
        color: white;
        background: #54aff9;
        padding: 3px 1.5em 2px 1.5em;
        border-radius: 10px 0 0 0px;
        box-shadow: 0 0 5px 0px #969696;
        position: relative;
        text-align: center;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }

    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }

    .unit-apply {
      font-size: 14px;
      line-height: 14px;
      color: #889aa4;
      cursor: pointer;
      float: right;
    }
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }
  .login-container::after {
    content: "";
    background: gray;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
  .main-middle{
    width:100%;
    height: 100%;
    max-width:1400px;
    margin: auto;
  }
  @media screen and (max-width:1200px){
    .main-middle{
      max-width: 980px;
    }
  }
</style>
