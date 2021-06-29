export const validateBet = (roullete, user, body) => {
  let Response;
  if (roullete === undefined || user === undefined) {
    Response = {
      code: 422,
      body: {
        message: 'invalid data'
      }
    };
  }

  if (!roullete?.status) {
    Response = {
      code: 200,
      body: {
        message: 'roulette not available'
      }
    };
  }

  const number = body.number ? body.number < 0 || body.number > 36 : false;
  const color = body.color
    ? body.color !== 'negro' && body.color !== 'rojo'
    : false;
  if (number || color) {
    Response = {
      code: 200,
      body: {
        message: 'Invalid information for betting'
      }
    };
  }

  if (!user?.money || user?.money <= 0) {
    Response = {
      code: 200,
      body: {
        message: 'user does not have enough fund to bet'
      }
    };
  }

  if (body.money < 0 || body.money > 10000) {
    Response = {
      code: 200,
      body: {
        message: 'The range in bet money is not valid'
      }
    };
  }

  return Response;
};
