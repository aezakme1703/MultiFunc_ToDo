import { useContext, useState } from 'react'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'

export default function NewProjectItem({setIsCreating}) {
  const { addProject, setCurrentProject } = useContext(ProjectsContext)
  const { register, handleSubmit, formState: { errors, isValid }  } = useForm({mode: "onChange"})

  const onSubmit = (data) => {
    if (isValid) {
      setCurrentProject(addProject(data.title.trim()))
      setIsCreating(false)
    }
  }
  // Обработчик нажатия клавиш
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit(onSubmit)()
    }
  }
  return (
    <>

    <div className={styles.container} style={errors.title && {borderColor: 'rgb(242, 81, 81)'}}>
      <input  
        className={styles.input} 
        type="text"
        {...register('title', { required: 'Необходимо заполнить данное поле'})}
        onKeyDown={handleKeyDown}
      />
      <button 
        className={styles.completeBtn} 
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <img src="src/assets/images/completeAdd.svg" alt="" style={errors.title && {filter: 'invert(50%) sepia(20%) saturate(5495%) hue-rotate(330deg) brightness(99%) contrast(92%)'}}/>
      </button>
      <span className={styles.error}>{errors.title ? errors.title.message : '\u00A0'}</span>
    </div>
    </>
    
  )
}