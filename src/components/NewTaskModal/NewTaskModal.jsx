

import { useContext, useEffect, useState } from 'react'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import { images } from '../../assets/images'


export default function NewTaskModal({setIsModalOpen, type}) {
  const { addTask, currentProject } = useContext(ProjectsContext)
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({ 
    mode: "onChange"
  })
  const onSubmit = (data) => {
    addTask(currentProject.id, data.title.trim(), data.descr.trim(), type)
    setIsModalOpen(false)
  }
  // Отработка кнопок
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit(onSubmit)()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setIsModalOpen])

  return (
    <div className={styles.container}>
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
          <button type="submit" className={styles.submitNewTask} disabled={!isValid}>Добавить</button>
        </form>
        <button onClick={() => setIsModalOpen(false)} className={styles.close}><img src={images.close} alt="" /></button>
      </div>
    </div>
  )
}
