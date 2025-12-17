import { create } from 'zustand'

type companyInfo = {
    company : string,
    compName : string,
    compAddr:  string,
}

interface State {
    companyList : companyInfo[]
    selectedCompany : string | null
}

interface Actions {
    actions : {
        setCompanyList : (companyList: companyInfo[]) => void,
        setCompany : (company : string) => void
    }
}

const initialState : State = {
    companyList : [],
    selectedCompany : null,
}

export const companyStore = create<State & Actions>(set => ({
    ...initialState,
    actions : {
        setCompanyList : companyList => set({companyList : companyList})
        , setCompany : company => set({selectedCompany : company})
    }
}));