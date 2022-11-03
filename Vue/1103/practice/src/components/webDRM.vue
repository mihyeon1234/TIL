<template>
    <div id="app">
        <h1>버튼 박스 제작</h1>
        <div style="border: solid 2px black">
            <h2>예약 페이지</h2>
            <h3>시간 선택</h3>
            <span v-for="(schedule, index) in schedules" :key="index">
                <div style="height:30px" v-if="index % 6 === 0"></div>
                <span class="off" :class="{ 'on': schedule.status }" @click="checkSchedule(schedule)">
                    {{ schedule.schedule }}
                </span>
            </span>
            <br><br>
            <hr>
            <div>
                <h3>선택 시간:
                    <span style="margin: 5px" v-for="schedule in scheduleSelected"
                        :key="schedule.id">{{ schedule }}</span>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>

const times = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
]

export default {
    name: 'WebDrm',
    data: function () {
        return {
            schedules: times.map(x => {
                return {
                    status: false,
                    schedule: x,
                }
            }),
            scheduleSelected: [],

        }
    },
    methods: {
        checkSchedule: function (schedule) {
            if (schedule.status) {
                this.scheduleSelected = this.scheduleSelected.filter(a => (a != schedule.schedule))
                schedule.status = false
            }
            else {
                if (this.scheduleSelected.length < 5) {
                    this.scheduleSelected.push(schedule.schedule)
                    this.scheduleSelected = this.scheduleSelected.sort()
                    schedule.status = true
                }
                else {
                    return alert('5타임까지만 신청할 수 있습니다.')
                }
            }
        }
    },
    computed: {

    }
}


</script>

<style>
#app {
    width: 600px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
}

.off {
    height: 2rem;
    margin: 5px;
    padding: 10px;
    color: #84898C;
    background-color: azure;
}

.on {
    height: 2rem;
    margin: 5px;
    padding: 10px;
    color: navy;
    background-color: #658dc63d;
}
</style>