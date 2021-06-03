# link-developer

![logo](ReadMeImage/625078.png)

✔[사이트 링크](http://3.16.138.36:5000)

**link-developer 프로젝트의 Repository 입니다.**

## 프로젝트 개요

- 프로젝트 명 : link-developer
- 개발 인원 : 1명
  - FullStack : **권혁진**
- 개발 기간 : 2021.04.03 ~ 
- 주요 기능
  - 스터디 모집 공고를 게시할 수 있음.
  - 자신이 원하는 스터리를 찾기위해 (Skill, 온/오프라인, 지역)을 필터를 통해 세부적으로 검색이 가능.
  - 자신의 프로필에 다룰 수 있는 기술과 프로젝트를 업로드 할 수 있고 다른 유저가 조회할 수 있음.
- 개발 언어 : JavaScript
- 개발 라이브러리
  - Frontend : React, Redux, ReduxThunk, Yup, Formik, Axios
  - Backend : Express, Mongoose, Multer, Jwt, bcrypt, AWS EC2
  - Database : MongoDB
- 형상 관리 툴 : Git
- 간단 소개 : 스터디 모집, 찾기 웹 서비스

## 프로젝트 특징

- link-developer

  - 사용자가 선호하는 스터디를 필터를 통해 제공하는 서비스
  - 자신의 프로필을 작성하여 다른 유저가 조회할 수 있는 서비스

- 프로젝트에서 중추적인 데이터를 리덕스를 사용하여 상태관리 함.

- 반응형 디자인

  - 모바일 모드: 주요 모델 지원 UI
  - 데스크탑 모드: 데스크탑 환경에서 한눈에 볼 수 있는 UI

## 프로젝트 기능

- 사용자가 사용할 수 있는 스킬과 경험했던 프로젝트를 프로필에 등록하여 다른 사람이 볼 수 있도록 할 수 있음

- link-developer에 가입한 다른 유저들의 프로필을 조회할 수 있음

- 임의의 스킬(JavaScript, Java 등)들을 검색하여 해당 스킬을 사용하는 유저들을 찾을 수 있음

- 사용자가 설정한 필터를 바탕으로 필터에 만족하는 스터디를 찾을 수 있음

## 트러블 이슈

### MyProfile 컴포넌트에서 Portfolio를 등록할때 DOM에 접근해야하는 문제
- 포트폴리오를 추가할때 Modal에서 입력한 값을 가져올 방법을 구상하다가 DOM에 접근하는 Document.getElementById.value로 가져오게 되었다.
- 하지만 리액트는 DOM에 직접 접근하는 것을 지양해야한다.
- 포트폴리오를 추가하는 Modal의 INPUT들 모두 State를 통해서 값을 저장하게 변경하였고 onChange 이벤트를 이용해서 값을 받도록하였다.

- 기존코드
```jsx
const projectName = document.getElementById('projectName').value;
        const date = document.getElementById('date').value;
        const position = document.getElementById('position').value;
        const skill = document.getElementById('skill').value;
        const discription = document.getElementById('discription').value;
        
        const newObject = {
            projectName: projectName,
            date: date,
            position: position,
            skill: skill,
            discription: discription
        }
```
- 개선 코드
```jsx
const projectNameChangeHandler = (event) => {
        setProjectName(event.target.value)
    }
    const positionChangeHandler = (event) => {
        setPosition(event.target.value)
    }
    const projectSkillChangeHandler = (event) => {
        setProjectSkill(event)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const progressDateChangeHandler = (event, datestring) => {
        setStartDate(datestring[0])
        setEndDate(datestring[1])
    }

    const onRegistrationHandler = () => {
        const newObject = {
            id: portfolioList.length,
            projectName: ProjectName,
            startDate: StartDate,
            endDate: EndDate,
            position: Position,
            skill: ProjectSkill,
            description: Description
        };
```

### useEffect 훅내에서 redux 로딩오류
- 컴포넌트 렌더링 전에 useEffect가 동작하면서 props 데이터로 백엔드에 요청을 보내지 못하는 이슈
- 컴포넌트 렌더링 이전에 DB를 조회하여 유저의 프로필 데이터를 가져오는 로직이라 유저의 프로필 데이터의 종속된 모든 코드들이 영향을 미침.

- 기존코드
```jsx
React.useEffect(() => {
    const userId = props.user.userData._id
    let body = {
        _id: userId
    }

    axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    setProfile(response.data.profile)
                    setSkill(response.data.profile.skill)
                    setPortfolioList(response.data.profile.portfolio)
                    response.data.profile.image[0] && setImage(response.data.profile.image[0].path)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }
  }, [])
```
- 1차 변경 코드
  - props 로딩되기전에 useEffect에 접근하면 return을하고 props가 업데이트 되었을때 다시 실행하도록 변경
  - 하지만 props가 로딩될때까지 시간이 존재하고 같은 로직을 두번 실행하는 현상 일어남. 비효율적임
```jsx
React.useEffect(() => {
     if (!props.user.userData) {
          return
    }
    
    const userId = props.user.userData._id
    let body = {
        _id: userId
    }

    axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    setProfile(response.data.profile)
                    setSkill(response.data.profile.skill)
                    setPortfolioList(response.data.profile.portfolio)
                    response.data.profile.image[0] && setImage(response.data.profile.image[0].path)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }
  }, [props.user])
```


* * *
- 2차 변경 코드
  - 로그인할 시에 localStorage에 저장되는 userId를 가져와 props 로딩과 상관없이 백엔드에 요청 보낼 수 있게 변경
```jsx
React.useEffect(() => {
    const userId = window.localStorage.getItem("userId")
    let body = {
        _id: userId
    }

    axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    setProfile(response.data.profile)
                    setSkill(response.data.profile.skill)
                    setPortfolioList(response.data.profile.portfolio)
                    response.data.profile.image[0] && setImage(response.data.profile.image[0].path)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }
  }, [])
```
- 3차 코드변경
  - UserInfo, StudyInfo의 데이터는 컴포넌트 전반적으로 사용되는 데이터이기 때문에 리덕스로 전역으로 상태관리를 해야할 필요성을 느껴 useSelector로 조회하도록 변경 이후 filter로 클라이언트에서 값을 가공하도록 변경
```jsx
  const userInfoList = useSelector(state => state.userInfo.userListData);
  
  useEffect(() => {

        getProfilePost()
    }, [])

    const getProfilePost = () => {
        if (!userInfoList) {
            dispatch(userInfo())
                .then(response => {
                    if (response.payload.success) {
                        infoFilter(response.payload.userList)
                    }
                    else {
                        alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                    }
                })
        }
        else {
            infoFilter(userInfoList.userList)
        }

    }
```

### StudyDetail 컴포넌트에서 백엔드 Axios 요청을 계속해서 보내는 현상
- 아래 함수를 렌더링되는 로직에 정의함으로서 계속해서 axios 요청을 보내는 현상
```jsx
const readWriterHandler = () => {
        let body = {
            _id: Study.writer
        }

        axios.post('/api/users/profile', body)
            .then(response => {
                setwriter(response.data.profile)
            })
            .catch(err => console.log(err))

        return (
            <td><a href={`/profile/${Study.writer}`}>{writer && writer.name}</a></td>
        )

    }
```
- 개선코드
  - 컴포넌트가 처음 마운트 되었을때 백엔드에 Study의 대한 응답을 받은뒤 Study에 있는 Writer의 아이디로 유저정보를 가져오게 변경
```jsx
const readWriterHandler = () => {
        axios.get(`/api/studyPost/studyPosts_by_id?id=${studyId}`)
            .then(response => {
                setStudy(response.data[0])
                console.log(response.data[0])
                let body = {
                    _id: response.data[0].writer
                }
                axios.post('/api/users/profile', body)
                .then(response => {
                    setwriter(response.data.profile)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])
```

### 각 컴포넌트가 렌더링될 때 동일한 API 요청을 중복되게 서버에 보내게 되고 그에 따른 state변경으로 재렌더링이 계속해서 일어나는 현상
- 각 컴포넌트마다 사용하는 데이터가 같지만 중복되게 API 요청을 보내어 비효율적이고 재렌더링이 일어남.
해결: props로 관리하기에는 너무 많은 컴포넌트가 사용하는 UserInfo, StudyInfo를 전역으로 상태 관리하게 변경

