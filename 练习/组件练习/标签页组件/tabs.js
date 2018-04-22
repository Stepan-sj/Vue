Vue.component('tabs',{
	template:
	`<div class="tabs">
		<div class="tabs-bar">
			<!-- 标签页，这里要用v-for -->
			<div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">
				{{item.label}}
			</div>
		</div>	
		<div class="tabs-content">
			<!-- 这里的slot就是要嵌套的pane-->
			<slot></slot>
		</div>
	</div>`,
	props:{
		value:{
			type:[String,Number]               
		}
	},
	data(){
		return {
			currentValue:this.value,
			// 用于渲染tabs的标题
			navList:[]
		}
	},
	methods:{
		tabCls(item){
			return [
				'tabs-tab',
				{
					// 给当前选中的tab加上一个class
					'tabs-tab-active':item.name === this.currentValue
				}
			]
		},
		// 点击tab标题时触发 
		handleChange(index){
			let nav = this.navList[index];
			let name = nav.name;
			// 改变选中tab，并触发watch
			this.currentValue = name;
			this.$emit('input',name);
			// 触发一个自定义事件，供父级使用
			this.$emit('on-click',name)
		},
		getTabs(){
			// 通过遍历子组件，得到所有的pane组件
			return this.$children.filter(item => {
				return item.$options.name === 'pane'
			})
		},
		updateNav(){
			this.navList = [];
			let _this = this;
			this.getTabs().forEach(function(pane,index){
				console.log(index)
				_this.navList.push({
					label:pane.$attrs.label,
					name:pane.$attrs.name || index
				});
				if (!pane.name) pane.name = index;
				if (index === 0) {
					if (!this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}
			})

			this.updateStatus()
		},
		updateStatus() {
			let tabs = this.getTabs();
			tabs.forEach(tab => {
				return tab.show = tab.name === this.currentValue;
			})
		}
	},
	watch:{
		value(val){
			this.currentValue = val;
		},
		currentValue(){
			// 选中tab发生变化时，更新pane的显示状态
			this.updateStatus()
		}
	}
})