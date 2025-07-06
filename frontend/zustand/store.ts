import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

const configStore = (set: any) => ({

    pageTitle: `` as any,
    setPageTitle: (title: string) => set(() => ({ pageTitle: `${title}` })),

    appTheme: `inherit` as any,
    setAppTheme: (theme: string) => set(() => ({ appTheme: `${theme}` }))

})

export const useConfigStore = create(
    devtools(
        persist(configStore, { name: "logitrac_config" })
    )
)