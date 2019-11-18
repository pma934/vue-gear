<template>
  <v-app >
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <!-- 内容 -->
      <router-view/>
      <!-- <TranslateForm @formSubmit="TranslateForm" style=" text-align: center"></TranslateForm>
      <TranslateOutput v-text="translatedText"></TranslateOutput>-->
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>
        &copy; 2017
        <router-link to="/about">about</router-link>|
        <router-link to="/elementtable">elementtable</router-link>|
        <router-link to="/sass">SassDemo</router-link>|
        <router-link to="/poke">PokeApi</router-link>|
        <router-link to="/antv">AntvG6</router-link>|
        <router-link to="/tree">AntvG6Tree</router-link>|
        <router-link to="/readExcel">ReadExcel</router-link>|
        <router-link to="/codePen">CodePen</router-link>|
        <router-link to="/RotateCardTest">RotateCardTest</router-link>|
        <router-link to="/ThreeTest">ThreeTest</router-link>|
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import TranslateForm from "./components/TranslateForm";
import TranslateOutput from "./components/TranslateOutput";
import $ from "jquery";
import md5 from "blueimp-md5";

export default {
  name: "App",
  mounted(){
    // console.log('aaa')
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",

      translatedText: ""
    };
  },
  components: {
    TranslateForm,
    TranslateOutput
  },
  methods: {
    TranslateForm: function(text, to) {
      var formdata = new FormData();
      formdata.append("q", text);
      formdata.append("appKey", "47bb6e424790df89");
      formdata.append("salt", "add_salt");
      formdata.append("from", "");
      formdata.append("to", to);
      formdata.append(
        "sign",
        md5(
          "47bb6e424790df89" +
            text +
            "add_salt" +
            "NH2VxBadIlKlT2b2qjxaSu221dSC78Ew"
        )
      );

      // this.$axios({
      //     method:'post',
      //     url: "/youdao/api",
      //     data: formdata,
      //   }).then(res => {
      //     console.log(res.data.translation)
      //   });

      this.$http.post("/youdao/api", formdata).then(res => {
        console.log(res.body.translation);
        this.translatedText = res.body.translation[0];
      });

      // $.ajax({
      //     type: 'post',
      //     url: "/youdao/api",
      //     data: {
      //       q: text,
      //       appKey: '47bb6e424790df89',
      //       salt: 'add_salt',
      //       from: '',
      //       to: to,
      //       sign: md5('47bb6e424790df89' + text + 'add_salt' + 'NH2VxBadIlKlT2b2qjxaSu221dSC78Ew')
      //     },
      //   }).then(data => {
      //     console.log(data.translation)
      //   });
    }
  }
};
</script>