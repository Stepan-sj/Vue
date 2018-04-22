function isValueNumber(val){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(val) 
}

Vue.component('input-number',{
	template:`
		<div class="input-number">
			<input type="text" 
			:value="currentValue" 
			@change="handleChange"
			@keydown.up="handleDown"
			@keydown.down="handleUp"
			></input>
			<button @click="handleDown" :disable="currentValue <= min">-</button>
			<button @click="handleUp" :disable="currentValue >= max">+</button>
		</div>
	`,
	props:{
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		}
	},
	data(){
		return {
			currentValue: this.value
		}
	},
	// watch  监听，使用此选项来监听某个prop或者data的改变，当它们发生变化时，就会触发watch选项配置的函数。
	watch:{
		currentValue(val){
			this.$emit('input',val);
			this.$emit('on-change',val)
		},
		value(val){
			this.updateValue(val)
		}
	},
	methods:{
		updateValue(val){
			if (val > this.max) val = this.max;
			if (val < this.min) val = this.min;
			this.currentValue = val
		},
		handleUp(event){
			if (this.currentValue >= this.max) return;
			this.currentValue += 1;
		},
		handleDown(event){
			event.preventDefault();
			if (this.currentValue <= this.min) return;
			this.currentValue -= 1
		},
		handleChange(event){
			let val = event.target.value.trim();
			let max = this.max;
			let min = this.min;

			if(isValueNumber(val)){
				val = Number(val);
				this.currentValue = val;

				if (val > max) {
					this.currentValue = max;
				} else {
					this.currentValue = min;
				}
			} else {
				event.target.value = this.currentValue;
			}
		}
	},
	mounted(){
		this.updateValue(this.value)
	}
})