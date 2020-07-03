import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import bsValidationHelperMixin from '@/mixins/bsValidationHelperMixin';
import SearchResultOutput from '@/components/SearchResultOutput';
import SubmissionsAPI from '@/api/SubmissionsAPI';

interface FormSubmission {
    fieldName: string;
    searchValue: any;
}

export default Vue.extend({
    components: {
        SearchResultOutput,
    },
    mixins: [validationMixin, bsValidationHelperMixin],
    data() {
        return {
            form: {
                fieldName: '',
                searchValue: null,
            } as FormSubmission,
            selectDataType: 'text',
            isLoading: false,
            searchResult: null,
        };
    },
    validations: {
        form: {
            fieldName: {
                required,
                maxLength: maxLength(20),
            },
            searchValue: {
                required,
            },
        },
    },
    computed: {
        // Formatting is necessary for the correct date display in the browser.
        formattedSearchValue() {
            if (this.$data.form.searchValue && this.$data.selectDataType === 'date') {
                return (this.$data.form.searchValue as Date).toISOString().substring(0, 10);
            }
            return this.$data.form.searchValue;
        },
    },
    methods: {
        clearSearchValue() {
            this.$data.form.searchValue = null;
        },
        async handleSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.warn('Form data is invalid. Submission canceled.');
            } else {
                this.$data.isLoading = true;
                this.$data.searchResult = null;
                const result = await new SubmissionsAPI().findSubmissions(this.$data.form);
                if (result) {
                    this.$v.$reset();
                    this.$data.searchResult = result;
                    this.$data.isLoading = false;
                }
            }
        },
        setSearchValue(value: string) {
            switch (this.$data.selectDataType) {
                case 'number':
                    this.$data.form.searchValue = Number(value);
                    break;

                case 'date':
                    this.$data.form.searchValue = new Date(value);
                    break;

                default:
                    this.$data.form.searchValue = value;
                    break;
            }
            this.$v.form.searchValue!.$touch();
        },
        handleKeyDown(e: Event) {
            // Prevent the user from entering a date using the keyboard. Use only DatePicker.
            if (this.$data.selectDataType === 'date') {
                e.preventDefault();
            }
        },
    },
});
