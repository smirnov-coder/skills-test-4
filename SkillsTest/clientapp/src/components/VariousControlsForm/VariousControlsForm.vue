<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <h3>Submit data of various types</h3>
                <hr />
                <form @submit.prevent="handleSubmit">
                    <!-- Single-line text field -->
                    <div class="form-group">
                        <label for="textField1" :class="getLabelClass('textField1')">TextField1</label>
                        <input type="text"
                               id="textField1"
                               class="form-control"
                               v-bind:class="getValidationClass('textField1')"
                               v-model.trim="$v.form.textField1.$model">
                        <div :class="getFeedbackClass('textField1')">
                            <div v-if="!$v.form.textField1.required">TextField1 is required.</div>
                            <div v-if="!$v.form.textField1.minLength">
                                TextField1 must have at least {{ $v.form.textField1.$params.minLength.min }} letters.
                            </div>
                            <div v-if="!$v.form.textField1.maxLength">
                                TextField1 must have maximum {{ $v.form.textField1.$params.maxLength.max }} letters.
                            </div>
                        </div>
                    </div>

                    <!-- Multi-line text field -->
                    <div class="form-group">
                        <label for="textArea1" :class="getLabelClass('textArea1')">TextArea1</label>
                        <textarea class="form-control"
                                  id="textArea1"
                                  v-bind:class="getValidationClass('textArea1')"
                                  v-model.trim="$v.form.textArea1.$model" />
                        <div :class="getFeedbackClass('textArea1')">
                            <div v-if="!$v.form.textArea1.required">TextArea1 is required.</div>
                            <div v-if="!$v.form.textArea1.minLength">
                                TextField1 must have at least {{ $v.form.textArea1.$params.minLength.min }} letters.
                            </div>
                            <div v-if="!$v.form.textArea1.maxLength">
                                TextField1 must have maximum {{ $v.form.textArea1.$params.maxLength.max }} letters.
                            </div>
                        </div>
                    </div>

                    <!-- Select (dropdown) field -->
                    <div class="form-group">
                        <label for="select1" :class="getLabelClass('select1')">Select1</label>
                        <div class="input-group">
                            <select class="custom-select rounded-right"
                                    id="select1"
                                    v-bind:class="getValidationClass('select1')"
                                    v-model="$v.form.select1.$model">
                                <option value="">Choose...</option>
                                <option value="option1">Option1</option>
                                <option value="option2">Option2</option>
                                <option value="option3">Option3</option>
                            </select>
                            <div :class="getFeedbackClass('select1')">
                                <div v-if="!$v.form.select1.required">Please choose an option.</div>
                            </div>
                        </div>
                    </div>

                    <!-- Number field -->
                    <div class="form-group">
                        <label for="numberFiend1" :class="getLabelClass('numberField1')">NumberField1</label>
                        <input type="number"
                               id="numberFiend1"
                               class="form-control"
                               v-bind:class="getValidationClass('numberField1')"
                               v-model.number="$v.form.numberField1.$model" />
                        <div :class="getFeedbackClass('numberField1')">
                            <div v-if="!$v.form.numberField1.required">NumberField1 is required.</div>
                            <div v-if="!$v.form.numberField1.decimal">
                                NumberField1 accepts positive and negative decimal numbers
                            </div>
                            <div v-if="!$v.form.numberField1.between">
                                NumberField1 must have value between {{ $v.form.numberField1.$params.between.min }}
                                and {{ $v.form.numberField1.$params.between.max }}.
                            </div>
                        </div>
                    </div>

                    <!-- Date field -->
                    <div class="form-group">
                        <label for="dateField1" :class="getLabelClass('dateField1')">DateField1</label>
                        <input type="date"
                               id="dateField1"
                               class="form-control"
                               v-bind:class="getValidationClass('dateField1')"
                               @change="$v.form.dateField1.$model = new Date($event.target.value)"
                               :value="$v.form.dateField1.$model.toISOString().substring(0, 10)"
                               @keydown.prevent="{}" />
                        <div :class="getFeedbackClass('dateField1')">
                            <div v-if="!$v.form.dateField1.required">dateField1 is required.</div>
                        </div>
                    </div>

                    <!-- Checkbox fields -->
                    <div class="form-group">
                        <label :class="getLabelClass('checkboxes1')">Checkbox1</label>
                        <div class="input-group">
                            <div class="custom-control custom-checkbox custom-control-inline"
                                 v-bind:class="getValidationClass('checkboxes1')">
                                <input type="checkbox"
                                       id="checkbox1"
                                       class="custom-control-input"
                                       v-bind:class="getValidationClass('checkboxes1')"
                                       value="option1"
                                       v-model="$v.form.checkboxes1.$model">
                                <label class="custom-control-label" for="checkbox1">Option1</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox"
                                       id="checkbox2"
                                       class="custom-control-input"
                                       v-bind:class="getValidationClass('checkboxes1')"
                                       value="option2"
                                       v-model="$v.form.checkboxes1.$model">
                                <label class="custom-control-label" for="checkbox2">Option2</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox"
                                       id="checkbox3"
                                       class="custom-control-input"
                                       v-bind:class="getValidationClass('checkboxes1')"
                                       value="option3"
                                       v-model="$v.form.checkboxes1.$model">
                                <label class="custom-control-label" for="checkbox3">Option3</label>
                            </div>
                            <div :class="getFeedbackClass('checkboxes1')">
                                <div v-if="!$v.form.checkboxes1.required">Please choose at least one option.</div>
                            </div>
                        </div>
                    </div>

                    <!-- Radio buttons -->
                    <div class="form-group">
                        <label :class="getLabelClass('radioButtons1')">RadioButtons1</label>
                        <div class="input-group">
                            <div class="custom-control custom-radio custom-control-inline"
                                 v-bind:class="getValidationClass('radioButtons1')">
                                <input type="radio"
                                       id="radioButton1"
                                       name="radioButtons"
                                       class="custom-control-input"
                                       v-bind:class="getValidationClass('radioButtons1')"
                                       :value="true"
                                       v-model="$v.form.radioButtons1.$model">
                                <label class="custom-control-label" for="radioButton1">True</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline"
                                 v-bind:class="getValidationClass('radioButtons1')">
                                <input type="radio"
                                       id="radioButton2"
                                       name="radioButtons"
                                       class="custom-control-input"
                                       v-bind:class="getValidationClass('radioButtons1')"
                                       :value="false"
                                       v-model="$v.form.radioButtons1.$model">
                                <label class="custom-control-label" for="radioButton2">False</label>
                            </div>
                            <div :class="getFeedbackClass('radioButtons1')">
                                <div v-if="!$v.form.radioButtons1.required">Please toggle one of the radio buttons.</div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" v-bind:disabled="isLoading">Submit</button>

                    <bs-modal :show="modal.show"
                              :bodyText="modal.text"
                              :isError="modal.isError"
                              @on-closed="clearModalState" />
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./VariousControlsPage.ts"></script>

<style lang="scss" src="./VariousControlsForm.scss"></style>