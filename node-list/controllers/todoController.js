const Todo = require('../models/todoModel');

// Yapılacaklar listesi ekleme
const addTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({
      title,
      user: req.user.id,
    });

    await todo.save();
    res.status(201).json({ message: 'Yapılacaklar listesi oluşturuldu', todo });
  } catch (error) {
    res.status(500).json({ error: 'Yapılacaklar listesi eklenirken bir hata oluştu' });
  }
};

// Yapılacaklar listesini listeleme
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Yapılacaklar listesi alınırken bir hata oluştu' });
  }
};

// Yapılacak işin durumunu güncelleme
const updateTodoStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'Yapılacak iş bulunamadı' });
    }

    res.json({ message: 'Yapılacak iş güncellendi', todo });
  } catch (error) {
    res.status(500).json({ error: 'Yapılacak iş güncellenirken bir hata oluştu' });
  }
};

// Yapılacak işin silinmesi
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ error: 'Yapılacak iş bulunamadı' });
    }

    res.json({ message: 'Yapılacak iş silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Yapılacak iş silinirken bir hata oluştu' });
  }
};

module.exports = { addTodo, getTodos, updateTodoStatus, deleteTodo };
