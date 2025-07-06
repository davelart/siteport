'use client'

import { Box, Button, Card, Container, Flex, IconButton, Link, Separator, Spinner, Switch, Text, TextField } from "@radix-ui/themes"
import * as Form from "@radix-ui/react-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { FaGoogle } from "react-icons/fa"
import { FiUser, FiKey } from "react-icons/fi"
import { BsEyeSlash, BsEye } from "react-icons/bs"
import { FaXTwitter } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SignInClientPage () {

    const router = useRouter()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const signInSchema = Yup.object().shape({
        username: Yup.string().max(100).required('Required'),
        password: Yup.string().min(6, 'Minimum Characters is 6').max(20, 'Maximum Characters is 20').required('Required'),
        rememberme: Yup.string()
    })

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch('/api/signin/credentials', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ username: data.username, password: data.password }) })

            if (response.ok) {
                const data = await response.json()
                toast.success('Signin successful', {position: 'bottom-right'})
                if (data.rememberme) {
                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('refresh_token', data.refresh)
                }
                router.push('/main')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Signin failed', {position: 'bottom-right'})
            }
        } catch (e) {
            console.error('Signin Error:', e)
            toast.error('Signin failed', {position: 'bottom-right'})
        }
    }

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: yupResolver(signInSchema),
    })

    return (<>
        <Container maxWidth={'1520px'} pb={'5'}>
            <Flex direction={'column'} align={'center'} justify={'center'}>
                <Card size={'5'}>
                    
                    <Flex direction={'column'} gap={'4'}>
                        <Flex align={'center'} justify={'center'} mb={'3'} gap={'5'} width={'100%'}>
                            <IconButton type={'button'} disabled color={'red'}><FaGoogle /></IconButton>
                            <IconButton type={'button'} disabled color={'gray'}><FaXTwitter /></IconButton>
                            <IconButton type={'button'} disabled color={'gray'}><FaFacebook /></IconButton>
                        </Flex>

                        <Flex align={'center'} justify={'center'} width={'100%'} gap={'4'}>
                            <Separator style={{ width: '100%' }}/>
                            <Text>Or</Text>
                            <Separator style={{ width: '100%' }} />
                        </Flex>

                        <Form.Root onSubmit={handleFormSubmit(handleSubmit)} style={{ width: '100%' }}>
                            <Flex direction={'column'} width={'100%'} gap={'4'}>
                                <Form.Field name={'username'} serverInvalid={errors.username !=null}>
                                    <TextField.Root size={{ initial: '3', md: '3' }} type={'text'} id={'username'} autoComplete={'off'} placeholder={'Username'} {...register('username')}>
                                        <TextField.Slot><FiUser size={'15'}/></TextField.Slot>
                                    </TextField.Root>
                                    {errors.username?.message && <Form.Message>{errors.username?.message}</Form.Message>}
                                </Form.Field>
                                <Form.Field name={'password'} serverInvalid={errors.password !=null}>
                                    <TextField.Root size={{ initial: '3', md: '3' }} type={show ? 'text' : 'password'} id={'password'} placeholder={'Password'} autoComplete={'off'} {...register('password')}>
                                        <TextField.Slot><FiKey size={'15'}/></TextField.Slot>
                                        <TextField.Slot side={'right'} pr={{ initial: '2', md: '2' }}>
                                            <Button type={'button'} size={'1'} color={'cyan'} variant={'outline'} onClick={handleClick}>{show ? <><Box display={{ initial: 'block', md: 'none' }}><BsEyeSlash /></Box><Box display={{ initial: 'none', md: 'block' }}></Box>Hide</> : <><Box display={{ initial: 'block', md: 'none' }}><BsEye /></Box><Box display={{ initial: 'none', md: 'block' }}>Show</Box></>}</Button>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    {errors.password?.message && <Form.Message>{errors.password?.message}</Form.Message>}
                                </Form.Field>
                                <Flex width={'100%'} justify={'between'} align={'center'}>
                                    <Form.Field name={'rememberme'}>
                                        <Form.Label htmlFor={'rememberme'}><Flex align={'center'} gap={'2'}><Switch size={'1'} id={'rememberme'} color={'cyan'} {...register('rememberme')} /><Text size={{ initial: '1', md: '2' }}>Remember me</Text></Flex></Form.Label>
                                    </Form.Field>
                                    <Link href={'/password-reset'} size={{ initial: '1', md: '2' }} color={'cyan'}>Forgot Password?</Link>
                                </Flex>
                                <Button color={'cyan'} size={{ initial: '3', md: '3'}} disabled={isSubmitting} type={'submit'} style={{ width: '100%' }}><Spinner loading={isSubmitting} />{isSubmitting ? 'Signing in' : 'Sign In'}</Button>
                                <Flex justify={'center'}>
                                    <Text color={'gray'} size={{ initial: '1', md: '2' }} align={'center'}>{`Don't have an account?`} <Link href={'/signup'} weight={'bold'} color={'cyan'}>Sign Up</Link></Text>
                                </Flex>
                            </Flex>
                        </Form.Root>
                        
                    </Flex>
                </Card>
            </Flex>
        </Container>
    </>)
}