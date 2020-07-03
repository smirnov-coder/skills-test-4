import Vue from 'vue';

export default Vue.extend({
    props: {
        searchResult: Array,
    },
    computed: {
        message(): string | null {
            if (!this.searchResult) {
                return null;
            }
            const count = this.searchResult.length;
            if (count) {
                return `Found ${count} record(s).`;
            }
            return 'No matches found.';
        },
        resultJson(): string | null {
            if (!this.searchResult || !this.searchResult.length) {
                return null;
            }
            return JSON.stringify(this.searchResult, undefined, 2);
        },
    },
});
