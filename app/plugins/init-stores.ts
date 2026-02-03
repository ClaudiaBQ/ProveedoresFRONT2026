import { useMasterStore } from '~/stores/master'
import { useConfStore } from '~/stores/configuration'


export default defineNuxtPlugin(async () => {
  const masterStore = useMasterStore()
  await masterStore.getAllMasters()

  const configStore = useConfStore()
  await configStore.init()
})
