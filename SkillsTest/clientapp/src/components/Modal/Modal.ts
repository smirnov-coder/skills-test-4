import Vue from 'vue';
import 'bootstrap/js/dist/modal.js';
import $ from 'jquery';

export default Vue.extend({
    props: {
        bodyText: String,
        isError: Boolean,
        show: Boolean,
    },
    watch: {
        show(value: boolean) {
            const modalElement = this.$refs.modal;
            if (value) {
                // Fix Property 'modal' does not exist on type 'JQuery<Vue | Element | Vue[] | Element[]>'
                ($(modalElement) as any).modal('show');
            }
        },
    },
});
