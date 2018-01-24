### Vue中可以缩写的指令 ###
	1.v-on 缩写
		<!-- 完整语法 -->
		<a v-on:click="doSomething"></a>
		
		<!-- 缩写 -->
		<a @click="doSomething"></a>
	2.v-bind 缩写

		<!-- 完整语法 -->
		<a v-bind:href="url"></a>
		
		<!-- 缩写 -->
		<a :href="url"></a>
		
		<!-- 完整语法 -->
		<button v-bind:disabled="someDynamicCondition">Button</button>
		
		<!-- 缩写 -->
		<button :disabled="someDynamicCondition">Button</button>
###  ###