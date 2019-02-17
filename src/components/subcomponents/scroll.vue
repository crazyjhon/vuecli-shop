
<template>
    <div ref="scroll" class="w-scroll">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.wScroll(this.$refs.scroll);
        },
        methods: {
            wScroll(elem) {
                var startX = 0,startY = 0;
                document.addEventListener('touchstart', function(evt) {
                    var touch = evt.touches[0];
                    startX = Number(touch.pageX);//触屏起始位置
                    startY = Number(touch.pageY);
                });
                elem.addEventListener('touchmove', function(ev) {
                    var _point = ev.touches[0],//获取触摸对象
                        _top = elem.scrollTop;//scroll元素的顶部坐标
                    var _bottomFaVal = elem.scrollHeight - elem.offsetHeight;
                    // console.log(_top + ":" + _bottomFaVal + ":" + elem.offsetHeight + ":" + elem.scrollHeight);
                    if(_top === 0) {
                        if(_point.clientY > startY) {
                            ev.preventDefault();
                        } else {
                            ev.stopPropagation();
                        }
                    } else if(_top === _bottomFaVal) {
                        elem.scrollTop--;
                    } else if(_top > 0 && _top < _bottomFaVal) {
                        ev.stopPropagation();
                    } else {
                        ev.preventDefault();
                    }
                }, {
                    passive: false
                });
            }
        }
    }
</script>
<style scoped="scoped">
    .w-scroll {
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
</style>