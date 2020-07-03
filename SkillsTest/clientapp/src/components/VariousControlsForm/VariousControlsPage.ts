import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, between, decimal, requiredIf } from 'vuelidate/lib/validators';
import BsModal from '@/components/Modal';
import bsValidationHelperMixin from '@/mixins/bsValidationHelperMixin';
import SubmissionsAPI from '@/api/SubmissionsAPI';

interface FormSubmission {
    textField1: string;
    textArea1: string;
    select1: string;
    numberField1: number;
    dateField1: Date;
    checkboxes1: string[];
    radioButtons1: boolean | null;
}

export default Vue.extend({
    components: {
        BsModal,
    },
    mixins: [validationMixin, bsValidationHelperMixin],
    data() {
        return {
            form: {
                textField1: '',
                textArea1: '',
                select1: '',
                numberField1: 0,
                dateField1: new Date(),
                checkboxes1: [],
                radioButtons1: null,
            } as FormSubmission,
            isLoading: false,
            modal: {
                show: false,
                isError: false,
                text: '',
            },
        };
    },
    validations: {
        form: {
            textField1: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(20),
            },
            textArea1: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(250),
            },
            select1: {
                required,
            },
            numberField1: {
                required,
                decimal,
                between: between(-100, 100),
            },
            checkboxes1: {
                required: requiredIf((checkboxArray) => {
                    return !checkboxArray.length;
                }),
            },
            radioButtons1: {
                required,
            },
            dateField1: {
                required,
            },
        },
    },
    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (this.$v.form.$invalid) {
                console.warn('Form is invalid. Submission canceled.');
            } else {
                this.isLoading = true;
                const result = await new SubmissionsAPI().saveSubmission(this.form);
                if (result) {
                    this.clearForm();
                    this.modal = {
                        isError: false,
                        text: 'Submission was saved successfully.',
                        show: true,
                    };
                } else {
                    this.modal = {
                        isError: true,
                        text: `Unfortunately, the form data could not be saved. The server returned an error
                                response. Open your browser console to view details.`,
                        show: true,
                    };
                }
                this.isLoading = false;
            }
        },
        clearForm() {
            this.$v.$reset();
            this.form = {
                textField1: '',
                textArea1: '',
                select1: '',
                numberField1: 0,
                dateField1: new Date(),
                checkboxes1: [],
                radioButtons1: null,
            } as FormSubmission;
        },
        clearModalState() {
            this.modal = {
                show: false,
                isError: false,
                text: '',
            };
        },
    },
});
