/* 
1、如果项目做大，得封装一个拖拽的库。
在可拖动目标（源元素）上触发的事件：
  ondragstart - 当用户  开始拖动元素时  发生
  ondrag - 当  元素被拖动时   发生
  ondragend - 当用户  完成拖动元素时  发生

在放置目标上触发的事件：
  ondragenter - 当被拖动的元素  进入放置目标时发生
  ondragover - 当被拖动的元素  在放置目标上时发生
  ondragleave - 当被拖动的元素  离开放置目标时发生
  ondrop - 当被拖动的元素  被放在放置目标上时发生

注释：拖动元素时，ondrag 事件每 350 毫秒触发一次。

2、我们在实现点击渲染界面的元素，控制面板显示对应属性的时候：
  click事件的发生在parser-xxx.js中，而不是在.vue文件的methods中
  为什么？
    首先，我们写在parser-xxx.js的缺点：
      我们避免不了的需要去 stopPropagation，且不能点选，也就是
      比如一个input，我们无法直接在渲染界面，对其的输入内容进行操作
      只能右边改改属性，placeholder什么的（与其相对的，vue文件实现，就可以）
    优点：代码和组件隔离开了，不需要去改变组件原有的逻辑，
      组件比较纯净，这样你换个组件库也会容易得多。

3、微内核：
  最经典的微内核工具：webpack
    你可以开发插件，然后生成实例，传入webpack里面
    如果把配置面板做成一个小的配置的渲染引擎，我们就可以把中间的json和
    右边配置面板的json串联起来，中间json即可渲染页面，也可以驱动配置面板，
    因为右边是根据另一套逻辑去渲染。
  这个思路去做，其实就是一个插件，包含两个部分：
    一部分是我中间需要去加载哪个组件，另一部分是选中组件对应的配置面板
  （做了抽象 ---> 配置的配置）
    缺点：写死成一套的渲染引擎去渲染对应的配置面板
          配置面板中的联动功能实现会比较复杂

4、store：
  比如container（root）下有两个container，叫 A 和 B，A下有按钮子组件 a，B下有按钮子组件 b
  这时候 a 和 b在两个不同的父容器内，root可以找到a和b，a和b却不能找到对方
  我们可以通过vuex
    a封装信息： 
      head：事件名称
      payload：传递事件的参数
      target：b
    a将信息传到store，store第一件事，不是找 b，而是把 a的信息 转成
    一个listener：事件名称（接收），再把接收挂到 b上。
    （上面的形式：总线 引导传值，一个发，一个帮忙挂listener）
  补充：还有一种形式，“收集广播”
    同样的 a 发送信息，但是store给每个人都挂上了listener


  ========================================
  待修正：
    配置面板的输入
    MainPage中stacks的静态变动态


*/