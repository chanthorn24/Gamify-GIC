<template>
<div>
    <h4>Time: {{ countDown }}s</h4>
    <div v-if="countDown == 0">
    A
    </div>
</div>
</template>

<script>
    export default {
        data () {
            return {
                countDown: 30
            }
        },
        methods: {
            countDownTimer () {
                if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            }
        },
        created () {
            this.countDownTimer()
        }
    }
</script>