import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { dbConfig } from '../db/config.mjs';

const API_URL = 'http://localhost:3001/api';

export async function searchRoom(searchTerm: string) {
  try {
    const response = await fetch(`${API_URL}/search/${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}