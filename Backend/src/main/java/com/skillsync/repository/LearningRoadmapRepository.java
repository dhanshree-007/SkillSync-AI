package com.skillsync.repository;

import com.skillsync.entity.LearningRoadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningRoadmapRepository extends JpaRepository<LearningRoadmap, Long> {
}
