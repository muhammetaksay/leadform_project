<template>
    <div>
        <!-- <lottie-animation
            path="./business-investor-gaining-profit-from-investment.json"
            :width="256"
            :height="256"
        />
        <lottie-animation
            path="./olympic-athlete.json"
            :width="256"
            :height="256"
        /> -->
        <form id="frm">

            <div class="egrid-row">
                <div class="egrid-col-6">
                    <div class="eforms-item" id="valid-customer_name">
                        Customer Name
                    <fieldset class="eforms-fieldset">
                        <label class="eforms-label" for="customer_name">Customer Name</label>
                        <input type="text" class="eforms-input" id="customer_name" v-model="customer_name" name="customer_name">
                    </fieldset>
                    <div class="feedback"></div>
                </div>
                </div>
                <div class="egrid-col-6">
                    <div class="eforms-item" id="valid-customer_surname">
                        Customer Surname
                        <fieldset class="eforms-fieldset">
                            <label class="eforms-label" for="customer_surname">Customer Surname</label>
                            <input type="text" class="eforms-input" id="customer_surname" v-model="customer_surname" name="customer_surname">
                        </fieldset>
                        <div class="feedback"></div>
                    </div>
                </div>
                <div class="egrid-col-6">
                    <div class="eforms-item" id="valid-customer_email">
                        Customer Email
                        <fieldset class="eforms-fieldset">
                            <label class="eforms-label" for="customer_email">Customer Email</label>
                            <input type="text" class="eforms-input" id="customer_email" v-model="customer_email" name="customer_email">
                        </fieldset>
                        <div class="feedback"></div>
                    </div>
                </div>
                <div class="egrid-col-6">
                    <div class="eforms-item" id="valid-customer_phone">
                        Customer Phone
                        <fieldset class="eforms-fieldset">
                            <label class="eforms-label" for="customer_phone">Customer Phone</label>
                            <input type="text" class="eforms-input" id="customer_phone" v-model="customer_phone" name="customer_phone">
                        </fieldset>
                        <div class="feedback"></div>
                    </div>
                </div>
            </div>
            <div v-for="question in questions" :key="question.id" class="elements-items">
                {{question.question}}
                <div v-if="question.form_type == 'inputtext'"  class="egrid-row">
                     <div class="eforms-item icon" :id="'valid-question_' + question.id">
                        <fieldset class="eforms-fieldset">
                            <label class="eforms-label" :for="'question_' + question.id">{{question.question}}</label>
                            <i class="eicon-user"></i>
                            <input type="text" class="eforms-input" :id="'question_' + question.id" :name="'question_' + question.id" v-model="answers[question.id]">
                        </fieldset>
                        <div class="feedback"></div>
                    </div>
                </div>
                <div  v-if="question.form_type == 'inputradio'" class="egrid-row">
                    <div class="eforms-item focused" id="valid-radio">
                        <fieldset class="eforms-fieldset label">
                            <div v-for="(answer, item) in question.form_data.split(',')" :key="item">
                            <label class="eforms-label">{{question.question}} <small>*</small></label>
                            <label class="eforms-radio" :for="'question_' + question.id + '_answer_' + item">
                                <input class="radio" type="radio" :name="'question_' + question.id" :value="answer" :id="'question_' + question.id + '_answer_' + item" v-model="answers[question.id]">
                                <div class="box"></div>
                                <div class="label">{{answer}}</div>
                            </label>
                            </div>
                        </fieldset>
                        <div class="eforms-feedback"></div>
                    </div>
                </div>
                <div v-if="question.form_type == 'inputrange'" class="egrid-row">
                    <div class="eforms-item focused" id="valid-radio">
                        <fieldset class="eforms-fieldset label">
                            <label class="eforms-label">{{question.question}} <small>*</small></label>
                            <label class="eforms-range" :for="'question_' + question.id">
                                <input class="range" type="range" min="0" max="100" step="1" :name="'question_' + question.id" value="50" :id="'question_' + question.id" v-model="answers[question.id]">
                                <div class="box"></div>
                                <!-- <div class="label">{{answer}}</div> -->
                            </label>
                        </fieldset>
                        <div class="eforms-feedback"></div>
                    </div>
                </div>

                <div v-if="question.form_type == 'select'" class="egrid-row">
                    <div class="egrid-col-6">
                        <div class="eforms-item" :id="'valid-question_' + question.id">
                            <fieldset class="eforms-fieldset">
                                <label class="eforms-label" :for="'question_' + question.id">{{question.question}}</label>
                                <select class="eforms-select" :name="'question_' + question.id" :id="'question_' + question.id" v-model="answers[question.id]">
                                    <option v-for="(answer, item) in question.form_data.split(',')" :value="answer" :key="item">{{answer}}</option>
                                </select>
                            </fieldset>
                            <div class="feedback"></div>
                        </div>
                    </div>
                </div>
                <div  v-if="question.form_type == 'inputcheckbox'" class="egrid-row">
                    <div class="eforms-item focused" id="valid-checkbox">
                        <fieldset class="eforms-fieldset label">
                            <div v-for="(answer, item) in question.form_data.split(',')" :key="item">
                                <label class="eforms-label">{{question.question}} <small>*</small></label>
                                <label class="eforms-checkbox" :for="'question_' + question.id + '_answer_' + item">
                                    <input class="checkbox" type="checkbox" :value="question.id + '_' + answer" :id="'question_' + question.id + '_answer_' + item"  v-model="selectCheckboxList">
                                    <div class="box"></div>
                                    <div class="label">{{answer}}</div>
                                </label>
                            </div>
                        </fieldset>
                        <div class="eforms-feedback"></div>
                    </div>
                </div>


                <div  v-if="question.form_type == 'textarea'" class="egrid-row">
                    <div class="eforms-item icon" :id="'valid-question_' + question.id">
                        <fieldset class="eforms-fieldset">
                            <label class="eforms-label" :for="'question_' + question.id">{{question.question}}</label>
                            <i class="eicon-edit-write"></i>
                            <textarea class="eforms-textarea" :id="'question_' + question.id" :name="'question_' + question.id"  v-model="answers[question.id]"></textarea>
                        </fieldset>
                        <div class="feedback"></div>
                    </div>
                </div>

            </div>
                <div class="egrid-row">
                    <div class="egrid-col-3">
                        <div class="eforms-button loading3 ew-100" id="btn-contactsend" @click="submitForm()">
                            Send<div></div>
                        </div>
                    </div>
                </div>
                        
        </form>
   <div class="elements-items ehide">
    <div class="egrid-row ew-100">
        <div class="egrid-col-4">
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item" id="valid-name">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="name">Name</label>
                    <input type="text" class="eforms-input" id="name" name="name">
                </fieldset>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item" id="valid-name">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="name">Name</label>
                    <input type="text" class="eforms-input" id="name" name="name">
                </fieldset>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item icon error" id="valid-name">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="name">Name</label>
                    <i class="eicon-user"></i>
                    <input type="text" class="eforms-input" id="name" name="name">
                </fieldset>
                <div class="feedback">error</div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item warning" id="valid-name">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="name">Name</label>
                    <input type="text" class="eforms-input" id="name" name="name">
                </fieldset>
                <div class="feedback">warning</div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item success" id="valid-name">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="name">Name</label>
                    <input type="text" class="eforms-input" id="name" name="name">
                </fieldset>
                <div class="feedback">success</div>
            </div>
        </div>
        <div class="egrid-col-6">
            <div class="eforms-item icon" id="valid-yourmessage">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="yourmessage">Your Message</label>
                    <i class="eicon-edit-write"></i>
                    <textarea class="eforms-textarea" id="yourmessage" name="yourmessage"></textarea>
                </fieldset>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-6">
            <div class="eforms-item" id="valid-yourmessage">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="yourmessage">Your Message</label>
                    <textarea class="eforms-textarea" id="yourmessage" name="yourmessage"></textarea>
                </fieldset>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-6">
            <div class="eforms-item" id="valid-select">
                <fieldset class="eforms-fieldset">
                    <label class="eforms-label" for="select">Select Name</label>
                    <select class="eforms-select" name="select" id="select">
                        <option value="#"></option>
                        <option value="#">Select 1</option>
                        <option value="#">Select 2</option>
                        <option value="#">Select 3</option>
                        <option value="#">Select 4</option>
                    </select>
                </fieldset>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-6"></div>
        
        <div class="egrid-col-4">
            <div class="eforms-item" id="valid-radio">
                <label class="eforms-radio" for="radio-1">
                    <input class="radio" type="radio" name="radio" value="1" id="radio-1">
                    <div class="box"></div>
                    <div class="label">Radio 1</div>
                </label>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item" id="valid-radio">
                <fieldset class="eforms-fieldset radio">
                    <label class="eforms-radio" for="radio-2">
                        <input class="radio" type="radio" name="radio" value="2" id="radio-2">
                        <div class="box"></div>
                        <div class="label">Radio 2</div>
                    </label>
                </fieldset>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item focused" id="valid-radio">
                <fieldset class="eforms-fieldset label">
                    <label class="eforms-label">Radio Name <small>*</small></label>
                    <label class="eforms-radio" for="radio-3">
                        <input class="radio" type="radio" name="radio" value="3" id="radio-3">
                        <div class="box"></div>
                        <div class="label">Radio 3</div>
                    </label>
                    <label class="eforms-radio" for="radio-4">
                        <input class="radio" type="radio" name="radio" value="4" id="radio-4">
                        <div class="box"></div>
                        <div class="label">Radio 4</div>
                    </label>
                </fieldset>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item focused" id="valid-checkbox">
                <label class="eforms-checkbox" for="checkbox-1">
                    <input class="checkbox" type="checkbox" name="checkbox" value="1" id="checkbox-1">
                    <div class="box"></div>
                    <div class="label">Checkbox 1</div>
                </label>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item" id="valid-checkbox">
                <fieldset class="eforms-fieldset borderbox">
                    <label class="eforms-checkbox" for="checkbox-2">
                        <input class="checkbox" type="checkbox" name="checkbox" value="2" id="checkbox-2">
                        <div class="box"></div>
                        <div class="label">Checkbox 2</div>
                    </label>
                </fieldset>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-4">
            <div class="eforms-item focused" id="valid-checkbox">
                <fieldset class="eforms-fieldset label">
                    <label class="eforms-label">Checkbox Name <small>*</small></label>
                    <label class="eforms-checkbox" for="checkbox-3">
                        <input class="checkbox" type="checkbox" name="checkbox" value="3" id="checkbox-3">
                        <div class="box"></div>
                        <div class="label">Checkbox 3</div>
                    </label>
                    <label class="eforms-checkbox" for="checkbox-4">
                        <input class="checkbox" type="checkbox" name="checkbox" value="4" id="checkbox-4">
                        <div class="box"></div>
                        <div class="label">Checkbox 4</div>
                    </label>
                </fieldset>
                <div class="eforms-feedback"></div>
            </div>
        </div>
        <div class="egrid-col-12">
            <div class="eforms-item">
                <label class="eforms-switch" for="switch-1">
                    <input class="checkbox" type="checkbox" name="switch" value="1" id="switch-1" checked="true">
                    <span class="slider"></span>
                </label>
                <div class="feedback"></div>
            </div>
        </div>
        <div class="egrid-col-3">
            <button class="eforms-button loading1 ew-100" id="btn-contactsend" type="submit">Send</button>
        </div>
        <div class="egrid-col-3">
            <button class="eforms-button loading1 ew-100" id="btn-contactsend" type="submit" disabled="true">Send</button>
        </div>
        <div class="egrid-col-3">
            <button class="eforms-button loading2 ew-100" id="btn-contactsend" type="submit" disabled="true">Send</button>
        </div>
        <div class="egrid-col-3">
            <button class="eforms-button loading3 ew-100" id="btn-contactsend" type="submit" disabled="true">
                Send<div></div>
            </button>
        </div>
    </div>
</div>
    </div>
</template>
<script src="./index.js"></script>
<style src="./index.scss" lang="scss"></style>