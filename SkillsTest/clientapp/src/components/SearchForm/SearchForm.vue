<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <h3>Search submissions</h3>
                <hr />
                <form @submit.prevent="handleSubmit">
                    <!-- FieldName field -->
                    <div class="form-group">
                        <label for="fieldName" :class="getLabelClass('fieldName')">Field Name</label>
                        <input type="text" id="fieldName" class="form-control"
                               v-bind:class="getValidationClass('fieldName')" v-model.trim="$v.form.fieldName.$model">
                        <div :class="getFeedbackClass('fieldName')">
                            <div v-if="!$v.form.fieldName.required">FieldName is required.</div>
                            <div v-if="!$v.form.fieldName.maxLength">
                                FieldName must have maximum {{ $v.form.fieldName.$params.maxLength.max }} letters.
                            </div>
                        </div>
                    </div>

                    <!-- SearchValue data type field -->
                    <div class="form-group">
                        <label for="selectDataType">Data Type</label>
                        <div class="input-group">
                            <select class="custom-select" id="selectDataType" v-model="selectDataType"
                                    @change="clearSearchValue">
                                <option value="text">String</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="radio">Boolean</option>
                            </select>
                        </div>
                    </div>

                    <!-- SearchValue field -->
                    <div class="form-group">
                        <label for="searchValue" :class="getLabelClass('searchValue')">Search Value</label>

                        <!--
                            If the type of the search value is 'boolean', then output a pair of RadioButton with the
                            values 'true' and 'false'.
                        -->
                        <div v-if="selectDataType === 'radio'" class="input-group">
                            <div class="custom-control custom-radio custom-control-inline"
                                 v-bind:class="getValidationClass('searchValue')">
                                <input type="radio" id="radioButton1" name="radioButtons" class="custom-control-input"
                                       v-bind:class="getValidationClass('searchValue')" :value="true"
                                       v-model="$v.form.searchValue.$model">
                                <label class="custom-control-label" for="radioButton1">True</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline"
                                 v-bind:class="getValidationClass('searchValue')">
                                <input type="radio" id="radioButton2" name="radioButtons" class="custom-control-input"
                                       v-bind:class="getValidationClass('searchValue')" :value="false"
                                       v-model="$v.form.searchValue.$model">
                                <label class="custom-control-label" for="radioButton2">False</label>
                            </div>
                            <div :class="getFeedbackClass('searchValue')">
                                <div v-if="!$v.form.searchValue.required">Please toggle one of the radio buttons.</div>
                            </div>
                        </div>

                        <!-- Otherwise, output a simple <input/> of the appropriate type. -->
                        <input v-if="selectDataType !== 'radio'"
                               id="searchValue"
                               v-bind:type="selectDataType"
                               class="form-control"
                               v-bind:class="getValidationClass('searchValue')"
                               :value="formattedSearchValue"
                               @input="setSearchValue($event.target.value)"
                               @keydown="handleKeyDown">
                        <div v-if="selectDataType !== 'radio'" :class="getFeedbackClass('searchValue')">
                            <div v-if="!$v.form.searchValue.required">SearchValue is required.</div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" v-bind:disabled="isLoading">Search</button>

                    <div class="mt-3">
                        <h5>Hint</h5>
                        <p>
                            The application contains a set of fake data to demonstrate the search. Try searching by the
                            field name <code>field1</code>, the data type <code>string</code> and the search value
                            <code>string_value_1</code> or by the name of the field <code>field2</code>, the data type
                            <code>boolean</code>, the search value <code>false</code> to see different results.
                        </p>
                    </div>
                </form>
            </div>
            <div class="col-12 col-md-6">
                <search-result-output :searchResult="searchResult" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./SearchForm.ts"></script>

<style lang="scss" src="./SearchForm.scss"></style>