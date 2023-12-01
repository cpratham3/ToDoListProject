package com.example.todolist.repo;

import com.example.todolist.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

// TaskRepository.java
public interface TaskRepository extends JpaRepository<Task, Long> {
}

