

import { useContext, useState } from 'react'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'


export default function NewTaskModal({setIsModalOpen, type}) {
  const { addTask, currentProject } = useContext(ProjectsContext)
  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm({ 
    mode: "onChange"
  })
  const onSubmit = (data) => {
    addTask(currentProject.id, data.title.trim(), data.descr.trim(), type)
    setIsModalOpen(false)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit(onSubmit)()
    }
  }
  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} >
        <h2 className={styles.header}>Новая задача</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputBlock}>
            <label htmlFor="title" className={styles.label}>Заголовок</label>
            <input 
              style={errors.title && {borderColor: 'rgb(242, 81, 81)'}} 
              id='title' type="text" 
              className={styles.input} 
              {...register('title', {required: 'Необходимо заполнить данное поле'})}
            />
            <span className={styles.error}>{errors.title ? errors.title.message : '\u00A0'}</span>
          </div>

          <div className={styles.inputBlock}>
            <label htmlFor="descr" className={styles.label}>Описание</label>
            <textarea style={errors.descr && {borderColor: 'rgb(242, 81, 81)'}} id='descr' type="text" className={styles.inputBig} {...register('descr', {
              required: 'Необходимо заполнить данное поле'
            })}/>
            <span className={styles.error}>{errors.descr ? errors.descr.message : '\u00A0'}</span>

          </div>
          <button type="submit" className={styles.submitNewTask}>Добавить</button>
        </form>
        <button onClick={() => setIsModalOpen(false)} className={styles.close}><img src="src/assets/images/close.svg" alt="" /></button>
      </div>
    </div>
  )
}