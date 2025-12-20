import {
    Paper,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Alert
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import * as React from "react";

type SignupFormState = {
    userName: string
    userId: string
    password: string
    passwordConfirm: string
    phone: string
    emailId: string
    emailDomain: string
    agreeService: boolean
    agreePrivacy: boolean
}

const initialState: SignupFormState = {
    userName: '',
    userId: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    emailId: '',
    emailDomain: '',
    agreeService: false,
    agreePrivacy: false,
}

export function SignupForm() {

    const [signupForm, setSignupForm] = useState<SignupFormState>(initialState);
    const [checkUserId, setCheckUserId] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const check = (condition: boolean, key: string, message: string) => {
        if (!condition) {
            setErrors({ [key]: message });
            return false;
        }
        return true;
    };

    const validate = () => {

        const validationResult: boolean =
            check(!!signupForm.userName, 'name', '이름을 입력해주세요') &&
            check(!!signupForm.userId, 'userId', '아이디를 입력해주세요') &&
            check(checkUserId === signupForm.userId, 'userId', '아이디 중복확인을 해주세요') &&
            check(!!signupForm.password, 'password', '비밀번호를 입력해주세요') &&
            check(!!signupForm.passwordConfirm, 'passwordConfirm', '비밀번호를 다시 입력해주세요') &&
            check(signupForm.password === signupForm.passwordConfirm, 'passwordConfirm', '비밀번호가 일치하지 않습니다') &&
            check(!!signupForm.phone, 'phone', '연락처를 입력해주세요') &&
            check(!!signupForm.emailId && !!signupForm.emailDomain, 'email', '이메일을 입력해주세요') &&
            check(signupForm.agreeService, 'agreeService', '필수 동의 항목입니다') &&
            check(signupForm.agreePrivacy, 'agreePrivacy', '필수 동의 항목입니다')

        if(validationResult){
            setErrors({})
        }

        return validationResult
    };

    const handleCheckUserId = () => {
        if(!check(!!signupForm.userId, 'userId', '아이디를 입력해주세요')) return;

        setLoading(true)
        try{
            const mockUserId : string[] = ['admin','user'];
            const isAvailable = !mockUserId.includes(signupForm.userId);

            //TODO 아이디 중복 체크 API 호출

            if(!isAvailable){
                setErrors({ userId: '이미 사용중인 아이디입니다' });
                setCheckUserId('');
            }else{
                setCheckUserId(signupForm.userId);
            }
        }finally {
            setLoading(false)

        }

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true)

        try{
            //TODO 회원가입 API 호출
        }finally {

            setLoading(false)
        }

        console.log('submit', { ...signupForm});
    };

    return (
        <>
            <Paper
                elevation={0}
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    height : '100%',
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h6" component="h1" fontWeight="bold" sx={{ color: '#000' }}>
                        🎉WorkUs에 오신것을 환영합니다.🎉
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1, color: '#333' }}>
                        계정정보를 등록하고 지금 바로 WorkUs를 사용하세요.
                    </Typography>
                </Box>

                <Typography variant="subtitle2" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
                    👱계정정보
                </Typography>

                <Box component="form" display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="이름"
                        value={signupForm.userName}
                        onChange={
                            (e) =>
                                setSignupForm({ ...signupForm, userName: e.target.value })
                        }
                        error={!!errors.userName}
                        helperText={errors.userName}
                        required
                        fullWidth
                    />

                    <Box display="flex" gap={1}>
                        <TextField
                            label="아이디"
                            value={signupForm.userId}
                            onChange={
                                (e) => {
                                    setCheckUserId('');
                                    setSignupForm({...signupForm, userId: e.target.value})
                                }
                            }
                            error={!!errors.userId && !checkUserId}
                            helperText= {
                                checkUserId ?
                                    (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'success.main',
                                            }}
                                        >
                                            사용가능한 아이디입니다.
                                        </Typography>
                                    )
                                : errors.userId
                            }
                            fullWidth
                            required
                        />
                        <Button
                            variant="outlined"
                            sx={{
                                height: 56,
                                whiteSpace: 'nowrap',
                            }}
                            onClick={handleCheckUserId}
                            disabled={loading}
                        >
                            중복 확인
                        </Button>
                    </Box>

                    <TextField
                        label="비밀번호"
                        type={showPassword ? 'text' : 'password'}
                        value={signupForm.password}
                        onChange={
                            (e) =>
                                setSignupForm({ ...signupForm, password: e.target.value })
                        }
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        label="비밀번호 (재입력)"
                        value={signupForm.passwordConfirm}
                        onChange={
                            (e) =>
                                setSignupForm({ ...signupForm, passwordConfirm: e.target.value })
                        }
                        error={!!errors.passwordConfirm}
                        helperText={errors.passwordConfirm}
                        type={showPassword ? 'text' : 'password'}
                        required
                    />

                    <TextField
                        label="연락처"
                        value={signupForm.phone}
                        onChange={
                            (e) =>
                                setSignupForm({ ...signupForm, phone: e.target.value })
                        }
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                    />

                    <Box display="flex" gap={1}>
                        <TextField
                            label="이메일"
                            value={signupForm.emailId}
                            onChange={
                                (e) =>
                                    setSignupForm({ ...signupForm, emailId: e.target.value })
                            }
                            error={!!errors.emailId}
                            helperText={errors.emailId}
                            fullWidth
                            required
                        />
                        <Typography sx={{ fontWeight: 600, mt: '15px' }}>
                            @
                        </Typography>

                        {/* 도메인 직접 입력 */}
                        <TextField
                            value={signupForm.emailDomain}
                            onChange={
                                (e) =>
                                    setSignupForm({ ...signupForm, emailDomain: e.target.value })
                            }
                            error={!!errors.emailDomain}
                            helperText={errors.emailDomain}
                            fullWidth
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={signupForm.agreeService}
                                onChange={
                                    (e) =>
                                        setSignupForm({ ...signupForm, agreeService: e.target.checked })
                                }
                                name="service"
                            />
                        }
                        label="서비스 이용약관에 동의합니다"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={signupForm.agreePrivacy}
                                onChange={
                                    (e) =>
                                        setSignupForm({ ...signupForm, agreePrivacy: e.target.checked })
                                }
                                name="privacy"
                            />
                        }
                        label="개인정보 처리방침에 동의합니다"
                    />

                    {
                        (!!errors.agreeService || !!errors.agreePrivacy)
                        && <Alert severity="error">
                            {errors.agreeService ?? errors.agreePrivacy}
                        </Alert>
                    }

                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, borderRadius: 999 }}
                        onClick={handleSubmit}
                    >
                        완료
                    </Button>
                </Box>

            </Paper>
        </>
    )
}