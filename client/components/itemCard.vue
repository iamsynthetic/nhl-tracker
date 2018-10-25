<template>
	<div class="card">
				<vk-card class="vkcardbg" type="blank">
					<!-- <img class="img-fluid" :src="item.logo" width="100" alt="Card image cap"> -->
					<!-- <vk-card-title>{{item.name | capitalize}}</vk-card-title> -->
					<vk-card-title>{{item.name | capitalize }}</vk-card-title>
					<div>
						<!-- <vk-button v-for="(group, index) in item.stack" :key="index" :type="`${tags[group]}`">{{ group }}</vk-button> -->
					</div>
				</vk-card>
  	</div>
</template>

<script>
	export default {
  		data() {
    		return {
      			// list of tags to giving each stack a different color
				tags: {
					language: "primary",
					framework: "secondary",
					frontend: "danger",
					backend: "text",
					mobile: "link",
					web: "secondary",
					hybrid: "primary",
					database: "danger"
				}
			};
  		},
  		filters: {
    		// this filter will can be used to capitalize a word
    		capitalize: item => {
      			return item.toUpperCase();
    		}
  		},
  		props: {
    		// this component expects a prop of type object
    		item: {
      			type: Object,
      			required: true
    		}
  		}
	};
</script>

<style lang="scss" scoped>
	@import '../styles/styles.scss';
	
	.vkcardbg{
		background-color:$lightgrey;
	}
</style>