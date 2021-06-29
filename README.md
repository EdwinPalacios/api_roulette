# Roulette Api

## Use

First of all run `npm install`
To run on local `npm run dev` or to compile `npm run build`

## Api endpoints

_[GET] host:port/api/v1/roulette_

_[POST] host:port/api/v1/roulette/create_

_[BODY]_

```
{"roulette": {"name": "Roulette N1"}}
```

_[GET] host:port/api/v1/roulette/opening/60da3a4b3f11f862a0658c8f_

_[GET] host:port/api/v1/roulette/bet/60da3a4b3f11f862a0658c8f_

_[BODY]_

```
{"money": 15,"color": "rojo"}
```

_[HEADERS]_

```
user-id 60da547bbd1fe746991809ce
```

_[GET] host:port/api/v1/roulette/closing/60da3a4b3f11f862a0658c8f_
