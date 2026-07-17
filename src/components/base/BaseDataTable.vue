<template>
  <ion-card>

    <ion-card-content>

      <ion-grid>

        <ion-row class="table-header">

          <ion-col
            v-for="column in columns"
            :key="column.key"
            :size="column.size ?? '2'"
          >
            <strong>{{ column.label }}</strong>
          </ion-col>

          <ion-col
            v-if="$slots.actions"
            size="2"
          >
            <strong>Actions</strong>
          </ion-col>

        </ion-row>

        <ion-row
          v-for="(row, index) in rows"
          :key="getRowKey(row, index)"
          class="table-row"
        >

          <ion-col
            v-for="column in columns"
            :key="column.key"
            :size="column.size ?? '2'"
          >
            {{ getValue(row, column.key) }}
          </ion-col>

          <ion-col
            v-if="$slots.actions"
            size="2"
          >
            <slot
              name="actions"
              :row="row"
            />
          </ion-col>

        </ion-row>

        <ion-row v-if="rows.length === 0">

          <ion-col
            size="12"
            class="empty-state"
          >
            Tidak ada data
          </ion-col>

        </ion-row>

      </ion-grid>

    </ion-card-content>

  </ion-card>
</template>

<script
  setup
  lang="ts"
  generic="T extends { id?: string | number }"
>
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/vue'

export interface TableColumn {
  key: string
  label: string
  size?: string
}

export interface TableRow {
  id?: number | string
  [key: string]: unknown
}

interface Props {
  columns: TableColumn[]
  rows: TableRow[]
}

const props = defineProps<Props>()

const getValue = (
  row: TableRow,
  key: string
): unknown => {
  return row[key]
}

const getRowKey = (
  row: TableRow,
  index: number
): string | number => {
  return row.id ?? index
}
</script>

<style scoped>
.table-header {
  font-weight: bold;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 10px;
}

.table-row {
  border-bottom: 1px solid #efefef;
  padding: 10px 0;
}

.empty-state {
  text-align: center;
  padding: 24px;
  color: var(--ion-color-medium);
}
</style>