import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const options = {
    icons: {
        iconfont: 'mdiSvg',
    },
}

export default new Vuetify(options)