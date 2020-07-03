/**
 * Mixin for working with Bootstrap form validation classes.
 */
const bsValidationHelperMixin = {
    methods: {
        getValidationClass(fieldName: string): string | null {
            if (!(this as any).$v.form[fieldName].$dirty) {
                return null;
            } else {
                return (this as any).$v.form[fieldName].$error ? 'is-invalid' : 'is-valid';
            }
        },
        getFeedbackClass(fieldName: string): string {
            return (this as any).$v.form[fieldName].$error ? 'invalid-feedback' : 'valid-feedback';
        },
        getLabelClass(fieldName: string): string | null {
            if (!(this as any).$v.form[fieldName].$dirty) {
                return null;
            } else {
                return (this as any).$v.form[fieldName].$error ? 'text-danger' : 'text-success';
            }
        },
    },
};

export default bsValidationHelperMixin;
