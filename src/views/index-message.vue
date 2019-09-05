<template>
  <div class="w100p h100p pos-fix pos-c z-1 app-wrap" ref="appBox" :class="getThemeSkinStore">
    <div class="w100p h100p pos-relative" :class="isNormal === true ? 'normal' : 'mini'">
			<Header @setTheme="setTheme"
							:themeSkinData="themeSkinData"
							:themeSkinType="getThemeSkinStore"></Header>

      <Main @watchChild="exchangeMenuStyle">{{ isNormal }}</Main>

    </div>
  </div>
</template>

<script>
  import Header from './common/header'
  import Main from './common/main'
  import Footer from './common/footer'
	export default {
		name: "Index-message",
    data () {
      return {
        isNormal: true, // true: normal menu, false: mini menu
				colorSkinName: 'default',
				themeSkinData: [
					{
						id: 1,
						className: 'default',
						styleName:'默认风格'
					},
					{
						id: 2,
						className: 'theme-style-blue',
						styleName:'蓝色主题'
					},
					{
						id: 3,
						className: 'theme-style-green',
						styleName:'紫色主题'
					}
				]
      }
    },
    components: {
      Header,
      Main,
      Footer
    },
		created() {
			let themeId = localStorage.getItem('themeId') * 1;
			if (!isNaN(themeId)) {
				this.setTheme(themeId);
			}
		},
		computed: {
			getThemeSkinStore() {
				return this.$store.state.colorSkinName
			}
		},
    methods: {
			//
			setTheme(index) {
				this.$store.commit('setThemeStyle', this.themeSkinData[index].className);
			},

			//Change menu style between normal and mini
      exchangeMenuStyle (bol) {
        console.log(bol);
        this.isNormal = bol
      }
    }
	}
</script>
