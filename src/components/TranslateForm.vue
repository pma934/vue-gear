<template>
  <div class="row">
    <div id="translateForm" class="col-md-6 col-md-offset-3">
      <form @submit="formSubmit" class="well form-inline">
        <input class="form-control" type="text" v-model="text" placeholder="输入需要翻译的内容">
        <select v-model="to" class="form-control">
          <option value="en">英文</option>
          <option value="ko">韩文</option>
          <option value="fr">法文</option>
          <option value="ru">俄文</option>
        </select>
        <input type="submit" class="btn btn-success" value="翻译">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "translateForm",
  data: function() {
    return {
      text: "",
      to: "en"
    };
  },
  methods: {
    formSubmit: function(e) {
      //alert(this.textToTranslate);
      this.$emit("formSubmit", this.text, this.to);
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>
