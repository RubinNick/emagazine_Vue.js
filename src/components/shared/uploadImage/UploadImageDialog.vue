<template>
    
</template>

<script>
export default {
    name: "UploadImage",
    data: () => ({
        image: ''
    }),
    methods: {
        getImage(event, name) {
            let reader = new FileReader();

            if(event.target.files && event.target.files.length > 0) {
                let file = event.target.files[0];
                reader.readAsDataURL(file);

                reader.onload = (result) => {
                    const imageName = result.currentTarget.result.substring(22);
                }
            } 
        }
    }    
}
</script>

<style scoped>

</style>
