import { Box, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from 'react-router'
import {AppButton} from "../../../../shared/ui";
import {TOKEN_STORAGE_KEY} from "../constants.ts";
import {useEffect} from "react";
import {companyStore} from "../../../../entities/company/model/companyStore.ts";


type props = {
    prevStep : ()=>void,
}

type companyInfo = {
    company : string,
    compName : string,
    compAddr:  string,
}

export function CompForm({prevStep}: props) {
    const navigate = useNavigate();
    const {companyList,} = companyStore(state => state);

    // 회사선택
    const handleSelectCompany =  (company : string) => async () => {
        console.log(company);
        navigate('/')
    }

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        prevStep();
    }

    useEffect(() => {
        if(companyList?.length === 0){
            navigate('/')
        }
    }, []);

    return (
        <Paper
            elevation={0}
            variant="outlined"
            sx={{
                width: '100%',
                maxWidth: 420,
                height : '100%',
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
            }}
            component="form"
        >

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h6" component="h1" fontWeight="bold" sx={{ color: '#000' }}>
                    안녕하세요!
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, color: '#333' }}>
                    접속할 회사를 선택해주세요
                </Typography>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    mb: 0,
                    px: 0.5,
                }}
            >
                <Stack spacing={2}>
                    {companyList?.map((companyInfo : companyInfo) => (
                        <Paper
                            key={companyInfo.company}
                            elevation={0}
                            sx={{
                                p: 1.5,
                                border: '1px solid #eee',
                                borderRadius: '12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.3s',
                                boxShadow : '0 1px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                }
                            }}
                            onClick={handleSelectCompany(companyInfo.company)}
                        >
                            <Stack>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {companyInfo.compName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {companyInfo.compAddr}
                                </Typography>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            <Stack spacing={1.5} sx={{ pt: 4, textAlign: 'center' }}>
                <Box>
                    <AppButton variant="outlined" color="inherit" type="button" onClick={handleLogout}>
                        로그아웃
                    </AppButton>
                </Box>
            </Stack>

        </Paper>
    )
}
