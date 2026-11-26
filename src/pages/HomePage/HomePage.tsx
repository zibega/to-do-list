import './HomePage.css';
import { ConfirmModal, TaskModal } from '../../components';
import { COLUMNS, TaskBoard } from '../../components/TaskBoard';
import { TaskFilters } from '../../components/TaskFilters';
import { DEFAULT_TASK_AVATARS, STATUS_FILTER_OPTIONS } from '../../data/board';
import { useBoard } from '../../hooks';

export const HomePage = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredTasks,
    hasActiveFilters,
    resetFilters,
    isModalOpen,
    defaultColumn,
    editingTask,
    taskToDelete,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmitTask,
    requestDeleteEditingTask,
    cancelDelete,
    confirmDelete,
  } = useBoard();

  return (
    <div className="home-container">
      <TaskFilters
        search={search}
        statusFilter={statusFilter}
        statusOptions={STATUS_FILTER_OPTIONS}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={resetFilters}
        onNewItemClick={() => openCreateModal()}
      />

      <TaskBoard
        columns={COLUMNS}
        tasks={filteredTasks}
        emptyText={hasActiveFilters ? 'Ничего не найдено' : 'Пока нет задач'}
        onAddColumnTask={openCreateModal}
        onTaskClick={openEditModal}
      />

      {isModalOpen && (
        <TaskModal
          isOpen
          defaultColumn={defaultColumn}
          initialTask={editingTask}
          defaultAvatars={DEFAULT_TASK_AVATARS}
          onClose={closeModal}
          onSubmit={handleSubmitTask}
          onDelete={requestDeleteEditingTask}
        />
      )}

      {taskToDelete && (
        <ConfirmModal
          isOpen
          title="Удалить задачу?"
          message={`Вы уверены, что хотите удалить задачу "${taskToDelete.title}"?`}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};
