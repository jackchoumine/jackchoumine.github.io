<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-05-29 17:29:48
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-05-29 18:29:48
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<template>
  <div class="SizeSpace bg-gray-200">
    <h1 class="text-3xl font-bold">尺寸</h1>
    <h2 class="text-2xl">数值和分数</h2>
    <div class="w-4 bg-green-200">16px</div>
    <div class="w-5 bg-green-200">20px</div>
    <div class="w-6 bg-green-200">24px</div>
    <div class="w-7 bg-green-200">28px</div>
    <div class="w-11 bg-green-200">44px</div>
    <div class="w-12 bg-green-200">48px</div>
    <div class="w-16 bg-green-200">64px</div>
    <div class="w-23 bg-green-200">92px</div>
    <div class="w-24 bg-green-200">96px</div>
    <div class="w-32 bg-green-200">128px</div>
    <div class="w-48 bg-green-200">192px</div>
    <div class="w-64 bg-green-200">256px</div>
    <div class="w-65 bg-green-200">260px</div>
    <div class="w-100 bg-green-200">400px</div>
    <div class="w-160 bg-green-200">640px</div>
    <hr />
    <div class="w-1/100 bg-green-200">1%</div>
    <div class="w-1/50 bg-green-200">2%</div>
    <div class="w-1/90 bg-green-200">1/90</div>
    <div class="w-1/4 bg-green-200">25%</div>
    <div class="w-1/3 bg-green-200">1/3</div>
    <div class="w-1/5 bg-green-200">1/5</div>
    <div class="w-1/24 bg-green-200">1/24</div>
    <h2 class="text-2xl">100% 和屏幕宽度</h2>
    <div class="w-full bg-green-200">父元素宽度</div>
    <!--<div class="w-screen bg-green-200">屏幕宽度</div>-->
    <hr />
    <h2 class="text-2xl">自动宽度和根据内容设置</h2>
    <div class="w-auto bg-green-200">自动计算</div>
    <div class="w-fit bg-green-200">自适应内容</div>
    <div class="w-fit bg-green-200">
      自适应内容 -- 最大不超过元素 Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Minus beatae optio est voluptatum vitae pariatur alias error exercitationem
      autem voluptate? Similique adipisci, ipsam temporibus maxime recusandae laborum
      eligendi! Voluptates, aperiam.
    </div>
    <div class="w-min bg-green-200">内容压缩到最小，可能换行</div>
    <div class="w-min bg-green-200">test</div>
    <div class="w-min bg-green-200">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </div>
    <div class="w-max bg-green-200">内容扩张到最大，可能溢出</div>
    <div class="w-max bg-green-200">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae optio est
      voluptatum vitae pariatur alias error exercitationem autem voluptate? Similique
      adipisci, ipsam temporibus maxime recusandae laborum eligendi! Voluptates, aperiam.
    </div>
    <hr />
    <h2 class="text-2xl">容器宽度</h2>
    <div class="w-3xs bg-green-200">3xs</div>
    <div class="w-2xs bg-green-200">
      2xs Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae optio est
      voluptatum vitae pariatur alias error exercitationem autem voluptate? Similique
      adipisci, ipsam temporibus maxime recusandae laborum eligendi! Voluptates, aperiam.
    </div>
    <div class="w-xs bg-green-200">
      xs Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae optio est
      voluptatum vitae pariatur alias error exercitationem autem voluptate? Similique
      adipisci, ipsam temporibus maxime recusandae laborum eligendi! Voluptates, aperiam.
    </div>
    <div class="w-sm bg-green-200">
      sm Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae optio est
      voluptatum vitae pariatur alias error exercitationem autem voluptate? Similique
      adipisci, ipsam temporibus maxime recusandae laborum eligendi! Voluptates, aperiam.
    </div>
    <div class="w-md bg-green-200">w-md</div>
    <div class="w-lg bg-green-200">w-lg</div>
    <div class="w-xl bg-green-200">w-xl</div>
    <div class="w-2xl bg-green-200">w-2xl</div>
    <div class="w-7xl bg-green-200">w-7xl</div>
    <hr />
    <h2 class="text-2xl">任意值</h2>
    <div class="w-(--min-w) bg-green-200">使用 --min-w 变量</div>
    <div class="w-[12.3rem] bg-green-200">w-[12.3rem]</div>
    <div class="w-[500px] bg-green-200">w-[500px]</div>
  </div>
</template>

<style lang="scss">
.SizeSpace {
  // scss code
}
</style>
