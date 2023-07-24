const { Error: { ValidationError, CastError } } = require('mongoose');
const Card = require('../models/card');
const {
  CARD_NOT_FOUND_MESSAGE,
  INCORRECT_ADD_CARD_DATA_MESSAGE,
  INCORRECT_LIKE_CARD_DATA_MESSAGE,
  INCORRECT_CARD_DATA_MESSAGE,
  NO_RIGHTS_TO_DELETE_ERROR_MESSAGE,
} = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// Функция проверки наличия данных
const checkData = (data) => {
  if (!data) throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
};

// Создание новой карточки
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => card.populate(['owner', 'likes']))
    .then((populatedCard) => res.send(populatedCard))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(INCORRECT_ADD_CARD_DATA_MESSAGE));
      }
      return next(error);
    });
};

// Получение списка карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

// Функция обработки ошибки лайка/дизлайка
const handleLikeError = (next, error) => {
  if (error instanceof CastError) {
    return next(new BadRequestError(INCORRECT_LIKE_CARD_DATA_MESSAGE));
  }
  return next(error);
};

// Лайк карточки
const updateLikeCard = async (res, next, cardId, options) => {
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      options,
      { new: true },
    ).populate(['owner', 'likes']);
    checkData(card);
    return res.send(card);
  } catch (error) {
    return handleLikeError(next, error);
  }
};

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  updateLikeCard(res, next, cardId, { $addToSet: { likes: _id } });
};

module.exports.dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  updateLikeCard(res, next, cardId, { $pull: { likes: _id } });
};

// Удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      checkData(card);

      const ownerId = card.owner.valueOf();
      const userId = req.user._id;
      if (ownerId !== userId) {
        return Promise.reject(new ForbiddenError(NO_RIGHTS_TO_DELETE_ERROR_MESSAGE));
      }
      return card.deleteOne();
    })
    .then((deletedCard) => res.send(deletedCard))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(INCORRECT_CARD_DATA_MESSAGE));
      }
      return next(error);
    });
};
