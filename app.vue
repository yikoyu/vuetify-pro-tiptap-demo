<script setup lang="ts">
import { useTheme } from 'vuetify'
import { BaseKit, Heading, type VuetifyTiptapOnChange, locale } from 'vuetify-pro-tiptap'

import CustomLang from '~/components/CustomLang.vue'
import preview from '~/extensions/preview'
import { jsonValue } from '~/constants/html'

const extensions = [
  preview.configure({ spacer: true }),
  BaseKit.configure({
    placeholder: {
      placeholder: 'Placeholder...'
    }
  }),
  Heading.configure({
    levels: [1, 2, 3, 4]
  })
]

const theme = useTheme()

const VuetifyTiptapRef = ref<null | Record<string, any>>(null)
const output = ref<'html' | 'json' | 'text'>('html')
const content = ref(jsonValue)
const markdownTheme = ref('')
const outlined = ref(true)
const dense = ref(false)
const editHtml = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)

const customLang = ref({ ...locale.message.en })

// watch(content, val => {
//   console.log('output :>> ', val)
// })

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function setCustom() {
  locale.setMessage('custom', unref(customLang))
  locale.setLang('custom')
}

function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
  console.log('output :>> ', output)
  console.log('output[html] :>> ', editor.getHTML())
  console.log('output[json] :>> ', editor.getJSON())
  console.log('output[text] :>> ', editor.getText())
}

function getHTML() {
  const value = VuetifyTiptapRef.value?.editor.getHTML()
  console.log('getHTML :>> ', value)
}

function getJSON() {
  const value = VuetifyTiptapRef.value?.editor.getJSON()
  console.log('getJSON :>> ', value, JSON.stringify(value))
}

function getText() {
  const value = VuetifyTiptapRef.value?.editor.getText()
  console.log('getText :>> ', value)
}
</script>

<template>
  <VApp id="app">
    <VContainer>
      <VAlert class="mb-4" type="info" title="Support repository" variant="tonal">
        <template #text>
          <div class="d-flex align-center">
            If you like the repository, you can give us
            <iframe
              class="ms-2"
              src="https://ghbtns.com/github-btn.html?user=yikoyu&repo=vuetify-pro-tiptap&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="120"
              height="20"
              title="GitHub"
            ></iframe>
          </div>
        </template>
      </VAlert>

      <VBtn class="mb-4" color="primary" @click="toggleTheme">
        {{ $vuetify.theme.current.dark ? 'dark' : 'light' }}
      </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('zhHans')"> set Chinese </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('en')"> set English </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="setCustom"> set Custom Lang </VBtn>

      <div class="my-4">
        <VBtnToggle v-model="markdownTheme" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value=""> Global </VBtn>

          <VBtn value="default"> Default </VBtn>

          <VBtn value="github"> Github </VBtn>

          <VBtn value="maidragon"> Maidragon </VBtn>
        </VBtnToggle>
      </div>

      <div class="my-4">
        <VBtnToggle v-model="output" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value="html"> Html </VBtn>

          <VBtn value="json"> Json </VBtn>

          <VBtn value="text"> Text </VBtn>
        </VBtnToggle>
      </div>

      <VBtn class="mb-4" color="primary" @click="getHTML"> getHTML </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getJSON"> getJSON </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getText"> getText </VBtn>

      <div class="my-4">
        <VDialog :width="maxWidth">
          <template #activator="{ props }">
            <VBtn v-bind="props" class="mb-4" color="primary" text="Viewer" />
          </template>

          <VCard>
            <VCardText>
              <VuetifyViewer :value="content" />
            </VCardText>
          </VCard>
        </VDialog>
      </div>

      <ClientOnly>
        <VuetifyTiptap
          ref="VuetifyTiptapRef"
          v-model="content"
          v-model:markdown-theme="markdownTheme"
          label="Title"
          :output="output"
          :hide-toolbar="hideToolbar"
          :disable-toolbar="disableToolbar"
          :outlined="outlined"
          :dense="dense"
          :error-messages="errorMessages"
          rounded
          :max-height="465"
          :max-width="maxWidth"
          :extensions="extensions"
          @change="onChangeEditor"
        />
      </ClientOnly>

      <VDivider class="my-4" />

      <!-- <VTextarea :value="content" readonly auto-grow /> -->

      <VDivider class="my-4" />

      <ClientOnly>
        <VuetifyTiptap
          v-model:markdown-theme="markdownTheme"
          label="Editor 2"
          :outlined="outlined"
          :dense="dense"
          rounded
          :max-height="465"
          :max-width="maxWidth"
          :extensions="extensions"
        />
      </ClientOnly>

      <VDivider class="my-4" />

      <VDivider class="my-4" />

      <CustomLang v-model="customLang" />
    </VContainer>
  </VApp>
</template>

<style>
.jse-main {
  max-height: 400px;
}
</style>
